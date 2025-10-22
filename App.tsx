import React, { useState, useEffect, createContext } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Clients from './pages/Clients';
import ImageEditor from './pages/ImageEditor';
import Settings from './pages/Settings';
import ProjectDetail from './pages/ProjectDetail';
import ClientDetail from './pages/ClientDetail';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

const App: React.FC = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        return (localStorage.getItem('theme') as Theme) || 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'light' ? 'dark' : 'light');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <HashRouter>
                <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                    <Sidebar />
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <Header />
                        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6 md:p-8">
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/projects" element={<Projects />} />
                                <Route path="/projects/:projectId" element={<ProjectDetail />} />
                                <Route path="/clients" element={<Clients />} />
                                <Route path="/clients/:clientId" element={<ClientDetail />} />
                                <Route path="/image-editor" element={<ImageEditor />} />
                                <Route path="/settings" element={<Settings />} />
                            </Routes>
                        </main>
                    </div>
                </div>
            </HashRouter>
        </ThemeContext.Provider>
    );
};

export default App;
