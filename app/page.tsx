'use client';

import { useEffect, useState } from 'react';
import { Mail, ArrowRight, Bot, Bolt, Activity, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';
import { Card } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ContactForm } from '@/components/contact-form';

export default function Home() {
    const [isRobotReady, setIsRobotReady] = useState(false);

    useEffect(() => {
        // Prevent browser from restoring previous scroll position
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!isRobotReady) return;

        const handlePointerMove = (e: PointerEvent) => {
            const canvas = document.querySelector('canvas');
            if (canvas && e.target !== canvas) {
                canvas.dispatchEvent(new PointerEvent('pointermove', {
                    clientX: e.clientX,
                    clientY: e.clientY,
                    bubbles: true,
                    cancelable: true,
                    pointerId: e.pointerId,
                    pointerType: e.pointerType,
                }));
            }
        };
        window.addEventListener('pointermove', handlePointerMove);
        return () => window.removeEventListener('pointermove', handlePointerMove);
    }, [isRobotReady]);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <main className="min-h-screen bg-background flex flex-col items-center overflow-x-hidden w-full relative transition-colors duration-500" style={{ isolation: 'isolate' }}>
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="currentColor"
            />

            {/* Navigation */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 flex flex-row items-center justify-between z-50 fixed top-0 backdrop-blur-md bg-background/50 border-b border-foreground/10 opacity-90 transition-colors duration-500"
            >
                <a
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 cursor-pointer group"
                >
                    <BrainCircuit className="text-foreground w-6 h-6 group-hover:text-foreground/80 transition-colors" />
                    <span className="text-foreground font-bold text-lg md:text-xl tracking-wide group-hover:text-foreground/80 transition-colors hidden sm:block">Physical Agents</span>
                    <span className="text-foreground font-bold text-lg tracking-wide group-hover:text-foreground/80 transition-colors sm:hidden">Agents</span>
                </a>

                <div className="flex items-center gap-2 md:gap-4">
                    <ThemeToggle />
                    <a
                        href="#contact"
                        onClick={(e) => scrollToSection(e, 'contact')}
                        className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium border border-foreground/20 rounded-full px-4 py-2 md:px-5 md:py-2 hover:bg-foreground/10"
                    >
                        Contact Us
                    </a>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden', isolation: 'isolate' }}>

                {/* Layer 1: The Base Text Content. Hardcoded z-index 1. */}
                <div className="absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center pointer-events-none pt-16 md:pt-0">
                    <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            className="max-w-2xl relative pointer-events-none flex flex-col items-center text-center lg:items-start lg:text-left mx-auto lg:mx-0"
                        >

                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 w-fit mb-6">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                <span className="text-xs text-foreground/90 uppercase tracking-wider font-medium tracking-wide">Physical AI Infrastructure</span>
                            </div>

                            <div className="relative flex flex-col items-center lg:items-start mb-6 w-full">
                                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-tight md:leading-[1.1]">
                                    We Build <br className="hidden md:block" />
                                    Skilled AI Agents <br className="hidden md:block" />
                                    for Manufacturing
                                </h1>
                            </div>

                            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl font-light mb-8 md:mb-10 leading-relaxed md:leading-relaxed">
                                Physical AI Infrastructure to turn your robots into skilled agents. Experience the future of industrial automation.
                            </p>

                            <div className="flex flex-col flex-wrap sm:flex-row justify-center lg:justify-start gap-3 md:gap-4 w-full relative pointer-events-auto">
                                <a
                                    href="#contact"
                                    onClick={(e) => scrollToSection(e, 'contact')}
                                    className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-foreground px-6 md:px-8 text-background font-medium transition-colors hover:bg-foreground/80"
                                >
                                    <Mail className="w-4 h-4 text-background" />
                                    GET IN TOUCH
                                </a>
                                <a
                                    href="#features"
                                    onClick={(e) => scrollToSection(e, 'features')}
                                    className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-transparent px-6 md:px-8 text-foreground font-medium border border-foreground/20 transition-colors hover:bg-foreground/5 relative z-20"
                                >
                                    Learn More
                                    <ArrowRight className="w-4 h-4 text-foreground" />
                                </a>
                            </div>

                        </motion.div>
                    </div>
                </div>

                {/* Layer 2: The 3D Render. Hardcoded z-index 9999. Placed IN FRONT of text! */}
                {/* The wrapping div is explicitly pointer-events-none so it doesn't block the screen, but the inner div allows mouse tracking. */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    className="absolute right-0 bottom-0 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:right-[2%] w-full lg:w-[30vw] xl:w-[45vw] 2xl:w-[60vw] h-[55vh] lg:h-[50vh] xl:h-[75vh] 2xl:h-[95vh] z-[9999] pointer-events-none hidden lg:flex items-center justify-center"
                >
                    <div style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}>
                        <SplineScene
                            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                            className="w-full h-full object-contain"
                            onLoad={() => {
                                // Wait 4 seconds for the initial zoom-out animation to settle
                                setTimeout(() => {
                                    setIsRobotReady(true);
                                }, 4000);
                            }}
                        />
                    </div>
                </motion.div>

            </section>

            {/* Features Grid */}
            <section id="features" className="w-full max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-6 relative border-t border-foreground/10 mt-10 md:mt-20" style={{ zIndex: 10 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Empowering the Future of Robotics</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">Next-generation cognitive frameworks built specifically to withstand the demands of modern manufacturing environments.</p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <Card className="bg-foreground/[0.03] border-foreground/[0.08] p-8 hover:bg-foreground/[0.05] transition-colors rounded-2xl h-full">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6 border border-blue-500/30">
                                <Bot className="text-blue-500 w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-3">Skill Integration</h3>
                            <p className="text-muted-foreground leading-relaxed">Seamlessly integrate adaptive skills into industrial robots with minimal setup time and human intervention.</p>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className="bg-foreground/[0.03] border-foreground/[0.08] p-8 hover:bg-foreground/[0.05] transition-colors rounded-2xl h-full">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6 border border-purple-500/30">
                                <Bolt className="text-purple-500 w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-3">Real-time Performance</h3>
                            <p className="text-muted-foreground leading-relaxed">Lightning-fast inference engines ensure operations run precisely without bottlenecks on the factory floor.</p>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Card className="bg-foreground/[0.03] border-foreground/[0.08] p-8 hover:bg-foreground/[0.05] transition-colors rounded-2xl h-full">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/30">
                                <Activity className="text-emerald-500 w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-3">Adaptive Learning</h3>
                            <p className="text-muted-foreground leading-relaxed">Continuous model enhancement through active physical reinforcement and high-fidelity synthetic data.</p>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="contact" className="w-full max-w-4xl mx-auto py-16 md:py-24 px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="bg-foreground/[0.03] border border-foreground/[0.08] rounded-3xl p-6 sm:p-8 md:p-12 backdrop-blur-sm"
                >
                    <div className="text-center mb-8 md:mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Get in Touch</h2>
                        <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto">
                            Ready to upgrade your manufacturing floor? Contact us to discuss how Physical Agents can transform your operations.
                        </p>
                    </div>

                    <ContactForm />
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="w-full border-t border-foreground/10 py-8 md:py-10 mt-auto bg-background relative" style={{ zIndex: 10 }}>
                <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <BrainCircuit className="text-foreground/50 w-5 h-5" />
                        <span className="text-foreground/50 font-medium">Physical Agents</span>
                    </div>
                    <p className="text-foreground/40 text-sm">
                        &copy; 2026 Physical Agents. All rights reserved.
                    </p>
                </div>
            </footer>
        </main>
    );
}
