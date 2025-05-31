import React, { useState, useEffect } from 'react';
import {  } from 'socket.io-client'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setConnected } from '../redux/slices/socket/socketSlice';
import { socket } from './socket';
import { setLoadingFalse, setLoadingTrue } from '../redux/slices/loader/loaderSlice';
import Loader from './Loader/Loader';
import { setStartTime } from '../redux/slices/timer/timerSlice';
import { setProblem } from '../redux/slices/editor/editorSlice';

const Home = () => {
    const [selectedOption, setSelectedOption] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [start, setStart] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const connected = useSelector((state) => state.socket.connected)
    const loading = useSelector((state) => state.loader.isLoading)
   
    useEffect(() => {
        if (!connected && start) {
            socket.on('matchFound', ({roomId,startTimestamp,problem}) => {
                dispatch(setConnected(roomId));
                dispatch(setStartTime(6000))
                dispatch(setProblem(problem))
                console.log(problem)
                localStorage.setItem('timer_startTimestamp', JSON.stringify(startTimestamp));
                dispatch(setLoadingFalse());
                navigate(`/duel/${roomId}`)
            });
        }
        return () => socket.off('findMatch');
    }, [dispatch, start, connected,navigate]);

    useEffect(() => {
        if (connected) {
            socket.on('status', (msg) => {
                // toast.info(msg)
                console.log(msg)
            })
        }
    }, [connected])


    const handleFindMatch = (option) => {
        if (option == "START GAME") {
            dispatch(setLoadingTrue('Searching for a match...'))
            socket.emit('findMatch');
            setStart(true);
        }
    };

    const menuOptions = [
        { label: "START GAME", icon: "▶", command: "./start_game.sh" },
        { label: "HIGH SCORES", icon: "★", command: "cat highscores.txt" },
        { label: "SETTINGS", icon: "⚙", command: "nano config.json" },
        { label: "EXIT", icon: "✕", command: "exit" }
    ];

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'ArrowUp') {
                setSelectedOption(prev => prev > 0 ? prev - 1 : menuOptions.length - 1);
            } else if (e.key === 'ArrowDown') {
                setSelectedOption(prev => prev < menuOptions.length - 1 ? prev + 1 : 0);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [menuOptions.length]);

    const PixelatedBackground = () => (
        <div className="fixed inset-0 opacity-20">
            <div
                className="w-full h-full"
                style={{
                    backgroundImage: `
                        linear-gradient(90deg, #000 1px, transparent 1px),
                        linear-gradient(180deg, #000 1px, transparent 1px)
                    `,
                    backgroundSize: '8px 8px',
                    imageRendering: 'pixelated'
                }}
            />
        </div>
    );

    const PixelDecoration = ({ color = '#00ffff', pattern = 'cross' }) => {
        const patterns = {
            cross: [
                '  ██  ',
                '  ██  ',
                '██████',
                '██████',
                '  ██  ',
                '  ██  '
            ],
            diamond: [
                '  ██  ',
                ' ████ ',
                '██████',
                '██████',
                ' ████ ',
                '  ██  '
            ],
            heart: [
                ' ██ ██ ',
                '███████',
                '███████',
                ' █████ ',
                '  ███  ',
                '   █   '
            ]
        };

        return (
            <div className="font-mono text-xs leading-none" style={{ color }}>
                {patterns[pattern].map((line, i) => (
                    <div key={i}>{line}</div>
                ))}
            </div>
        );
    };

    const PixelParticles = () => (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {[...Array(15)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-2 animate-ping"
                    style={{
                        backgroundColor: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00'][i % 4],
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${2 + Math.random() * 2}s`,
                        imageRendering: 'pixelated'
                    }}
                />
            ))}
        </div>
    );

    const TerminalWindow = () => (
        <div className="bg-black border-4 border-cyan-400 rounded-lg shadow-2xl overflow-hidden" style={{ width: '80%', height: '70%' }}>
            {/* Terminal title bar */}
            <div className="bg-gray-900 border-b-4 border-cyan-400 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                        <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-red-700"></div>
                        <div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-yellow-700"></div>
                        <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-green-700"></div>
                    </div>
                    <span className="text-cyan-400 text-lg font-mono font-bold">TERMINAL - CODING-DUEL</span>
                </div>
                <div className="text-cyan-400 text-sm font-mono">
                    user@gaming-rig:~/coding-duel$
                </div>
            </div>

            {/* Terminal content */}
            <div className="p-6 h-full bg-black font-mono text-green-400 relative overflow-hidden mb-24">
                {/* Terminal output */}
                <div className="space-y-1 mb-6 text-sm">
                    <div className="text-cyan-400">
                        Last login: {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()} on ttys000
                    </div>
                    <div className="text-gray-400">
                        user@gaming-rig:~/coding-duel$ ls -la
                    </div>
                    <div className="text-white text-xs space-y-1">
                        <div>drwxr-xr-x  8 user user  256 May 25 12:30 .</div>
                        <div>drwxr-xr-x 15 user user  480 May 25 12:29 ..</div>
                        <div className="text-cyan-400">-rwxr-xr-x  1 user user 2048 May 25 12:30 start_game.sh</div>
                        <div className="text-yellow-400">-rw-r--r--  1 user user  512 May 25 12:25 highscores.txt</div>
                        <div className="text-green-400">-rw-r--r--  1 user user  256 May 25 12:20 config.json</div>
                    </div>
                    <div className="text-gray-400 mt-3">
                        user@gaming-rig:~/coding-duel$ ./launch_menu.sh
                    </div>
                </div>

                {/* ASCII Art Title */}
                <div className="text-center mb-6">
                    <pre className="text-cyan-400 font-bold text-xs leading-tight pixel-glow">
                        {`╔══════════════════════════════════════════════════════╗
  ██████╗  ██████╗  ██████╗  ██╗ ███╗   ██╗  ██████╗      
 ██╔════╝ ██╔═══██╗ ██╔══██╗ ██║ ████╗  ██║ ██╔════╝      
██║      ██║   ██║ ██║  ██║ ██║ ██╔██╗ ██║ ██║  ███╗     
██║      ██║   ██║ ██║  ██║ ██║ ██║╚██╗██║ ██║   ██║     
 ╚██████╗ ╚██████╔╝ ██████╔╝ ██║ ██║ ╚████║╚ ██████╔╝     
 ╚═════╝  ╚═════╝  ╚═════╝  ╚═╝ ╚═╝  ╚═══╝ ╚═════╝      
══════════════════════════════════════════════════════╣
        ██████╗ ██╗   ██╗███████╗██╗                        
        ██╔══██╗██║   ██║██╔════╝██║                        
        ██║  ██║██║   ██║█████╗  ██║                        
        ██║  ██║██║   ██║██╔══╝  ██║                        
        ██████╔╝╚██████╔╝███████╗███████╗                   
        ╚═════╝  ╚═════╝ ╚══════╝╚══════╝                   
╚══════════════════════════════════════════════════════╝`}
                    </pre>
                    <div className="text-yellow-400 text-xs mt-2 animate-pulse">
                        [TERMINAL GAME LAUNCHER v2.1.4]
                    </div>
                </div>

                {/* Menu Options */}
                <div className="space-y-2 max-w-2xl mx-auto mb-24">
                    <div className="text-green-400 mb-3 text-sm">
                        → Select an option using ↑↓ arrow keys and press ENTER:
                    </div>

                    {menuOptions.map((option, index) => (
                        <div
                            key={index}
                            className={`flex items-center p-2 rounded cursor-pointer transition-all duration-200 border-2 ${selectedOption === index
                                ? 'bg-green-900 bg-opacity-50 border-green-400 pixel-glow'
                                : 'border-transparent hover:bg-gray-900 hover:bg-opacity-30'
                                }`}
                            onMouseEnter={() => setSelectedOption(index)}
                            onClick={() => handleFindMatch(option.label)}
                        >
                            <div className="w-6 text-center">
                                {selectedOption === index && (
                                    <span className="text-green-400 animate-pulse">▶</span>
                                )}
                            </div>
                            <div className="flex items-center space-x-3 flex-1">
                                <span className="text-xl">{option.icon}</span>
                                <div className="flex-1">
                                    <div className={`font-bold ${selectedOption === index ? 'text-white' : 'text-gray-300'
                                        }`}>
                                        [{index + 1}] {option.label}
                                    </div>
                                    <div className="text-gray-500 text-xs font-mono">
                                        $ {option.command}
                                    </div>
                                </div>
                            </div>
                            {selectedOption === index && (
                                <div className="text-green-400 text-xs animate-bounce">
                                    [ENTER]
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* System Info */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-gray-500">
                    <div>
                        <div>System: Ubuntu 22.04 LTS</div>
                        <div>Shell: bash 5.1.16</div>
                    </div>
                    <div className="text-right">
                        <div>CPU: 85% | RAM: 4.2GB/16GB</div>
                        <div>Network: Connected | GPU: Ready</div>
                    </div>
                </div>

                {/* Blinking cursor */}
                <div className="absolute bottom-12 left-6">
                    <span className="text-green-400">user@gaming-rig:~/coding-duel$ </span>
                    <span className="animate-pulse">█</span>
                </div>
            </div>
        </div>
    );



    return (
        <>
            {
                loading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
                        <Loader />
                    </div>
                )
            }
            <div className="min-h-screen bg-black text-white font-mono relative overflow-hidden">
                <style jsx="true">{`
                @keyframes scroll-left {
                    from { transform: translateX(100%); }
                    to { transform: translateX(-100%); }
                }
                
                @keyframes pixel-glow {
                    0%, 100% { 
                        box-shadow: 0 0 10px currentColor, inset 0 0 10px currentColor; 
                    }
                    50% { 
                        box-shadow: 0 0 20px currentColor, inset 0 0 20px currentColor; 
                    }
                }
                
                .pixel-glow {
                    animation: pixel-glow 2s ease-in-out infinite;
                }
                
                * {
                    image-rendering: pixelated;
                    image-rendering: -moz-crisp-edges;
                    image-rendering: crisp-edges;
                }
            `}</style>

                <PixelatedBackground />
                <PixelParticles />


                {/* Background Title */}
                <div className="absolute top-32 left-0 right-0 text-center z-0">
                    <div className="relative">
                        <h1 className="text-8xl font-black mb-4 pixel-glow opacity-30" style={{
                            background: 'linear-gradient(90deg, #00ffff, #ff00ff, #ffff00, #00ff00)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '6px 6px 0px #000000'
                        }}>
                            CODING
                        </h1>
                        <h1 className="text-8xl font-black mb-8 pixel-glow opacity-30" style={{
                            background: 'linear-gradient(90deg, #ff00ff, #ffff00, #00ff00, #00ffff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '6px 6px 0px #000000'
                        }}>
                            DUEL
                        </h1>

                        {/* Background Decorative pixels */}
                        <div className="absolute -top-8 -left-8 opacity-50">
                            <PixelDecoration color="#00ffff" pattern="diamond" />
                        </div>
                        <div className="absolute -top-8 -right-8 opacity-50">
                            <PixelDecoration color="#ff00ff" pattern="heart" />
                        </div>
                        <div className="absolute -bottom-8 -left-8 opacity-50">
                            <PixelDecoration color="#ffff00" pattern="cross" />
                        </div>
                        <div className="absolute -bottom-8 -right-8 opacity-50">
                            <PixelDecoration color="#00ff00" pattern="diamond" />
                        </div>
                    </div>
                </div>

                {/* Main Terminal */}
                <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
                    <TerminalWindow />
                </div>

                {/* Stats/Info boxes */}
                <div className="absolute bottom-16 left-8 right-8 flex justify-between z-10">
                    <div className="bg-green-400 text-black border-4 border-green-600 px-4 py-2 font-bold">
                        <div>SCORE: 999999</div>
                        <div>HIGH: 999999</div>
                    </div>

                    <div className="bg-yellow-400 text-black border-4 border-yellow-600 px-4 py-2 font-bold">
                        <div>LEVEL: 99</div>
                        <div>LIVES: ♥♥♥</div>
                    </div>

                    <div className="bg-red-400 text-black border-4 border-red-600 px-4 py-2 font-bold">
                        <div>TIME: 999</div>
                        <div>COINS: 99</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;