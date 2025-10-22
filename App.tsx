import React, { useState, useEffect, createContext } from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
// Fix: Use types and methods from firebase compat
import firebase from 'firebase/compat/app';
import { auth, isFirebaseConfigured } from './services/firebase';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Clients from './pages/Clients';
import ImageEditor from './pages/ImageEditor';
import Settings from './pages/Settings';
import Login from './pages/Login';
import { SpinnerIcon } from './components/icons';

type Theme = 'light' | 'dark';

interface AppContextType {
    theme: Theme;
    toggleTheme: () => void;
    user: firebase.User | null;
}

export const AppContext = createContext<AppContextType | null>(null);

const FirebaseNotConfigured: React.FC = () => (
    <div className="relative flex items-center justify-center h-screen bg-gray-900 text-white overflow-hidden">
        <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
                backgroundImage: "url('https://picsum.photos/seed/dosa-bg/1920/1080')",
                filter: 'brightness(0.4)'
            }}
            aria-hidden="true"
        ></div>
        <div className="relative z-10 flex flex-col items-center text-center p-8 max-w-3xl bg-black/40 rounded-lg backdrop-blur-sm border border-gray-700">
            <svg className="w-16 h-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h1 className="text-4xl font-bold tracking-wider mb-4">Configuration Needed</h1>
            <p className="text-lg text-gray-300 mb-6">
                The connection to the backend database has not been configured.
            </p>
            <div className="text-left bg-gray-800 p-4 rounded-md font-mono text-sm max-w-xl w-full border border-gray-600">
                <p className="text-gray-400">// To fix this:</p>
                <p className="mt-1">1. Open the file: <code className="text-yellow-400 bg-gray-700 px-1 py-0.5 rounded">services/firebase.ts</code></p>
                <p className="mt-1">2. Replace the placeholder values in the <code className="text-cyan-400">firebaseConfig</code> object with your keys from the Firebase Console.</p>
                <p className="mt-3 text-gray-400">See <code className="text-yellow-400 bg-gray-700 px-1 py-0.5 rounded">firebase-setup-instructions.md</code> for a full guide.</p>
            </div>
        </div>
        <footer className="absolute bottom-4 text-center w-full text-gray-400 text-sm z-10">
            &copy; {new Date().getFullYear()} DOSALA INC. All Rights Reserved.
        </footer>
    </div>
);

const ProtectedLayout: React.FC = () => {
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};


const App: React.FC = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        const storedTheme = localStorage.getItem('theme');
        return (storedTheme as Theme) || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    });

    const [user, setUser] = useState<firebase.User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!isFirebaseConfigured) {
            setLoading(false);
            return;
        }
        // Fix: Use onAuthStateChanged method from the auth service instance
        const unsubscribe = auth!.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'light' ? 'dark' : 'light');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    if (!isFirebaseConfigured) {
        return <FirebaseNotConfigured />;
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
                <SpinnerIcon className="w-12 h-12 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <AppContext.Provider value={{ theme, toggleTheme, user }}>
            <HashRouter>
                <Routes>
                    <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
                    
                    {user ? (
                        <Route element={<ProtectedLayout />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/clients" element={<Clients />} />
                            <Route path="/image-editor" element={<ImageEditor />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="*" element={<Navigate to="/dashboard" replace />} />
                        </Route>
                    ) : (
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    )}
                </Routes>
            </HashRouter>
        </AppContext.Provider>
    );
};

export default App;