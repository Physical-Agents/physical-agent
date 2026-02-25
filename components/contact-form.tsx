'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function ContactForm() {
    const [isPending, setIsPending] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMsg, setErrorMsg] = useState('')

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsPending(true)
        setStatus('idle')
        setErrorMsg('')

        const form = event.currentTarget
        const formData = new FormData(form)

        // Add Web3Forms access key
        // Fetch Web3Forms access key from environment variable
        formData.append('access_key', process.env.NEXT_PUBLIC_WEB_FORM as string)

        // Optional: Web3Forms subject line customization
        formData.append('subject', 'New Contact Form Submission from Physical Agents')

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })

            const data = await response.json()

            if (data.success) {
                setStatus('success')
                form.reset() // Clear the form
            } else {
                setStatus('error')
                setErrorMsg(data.message || 'Something went wrong. Please try again.')
            }
        } catch (error) {
            setStatus('error')
            setErrorMsg('Network error. Please try again.')
        } finally {
            setIsPending(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative">
            <AnimatePresence>
                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl p-4 flex items-center justify-center gap-2"
                    >
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium text-sm">Message sent successfully! We'll be in touch soon.</span>
                    </motion.div>
                )}

                {status === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl p-4 flex items-center justify-center gap-2"
                    >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium text-sm">{errorMsg}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hidden honeypot field to prevent spam bots */}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        disabled={isPending}
                        placeholder="John Doe"
                        className="h-12 w-full rounded-xl bg-background/50 border border-foreground/10 px-4 text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all disabled:opacity-50"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Work Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        disabled={isPending}
                        placeholder="john@company.com"
                        className="h-12 w-full rounded-xl bg-background/50 border border-foreground/10 px-4 text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all disabled:opacity-50"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="company" className="text-sm font-medium text-muted-foreground">Company Name</label>
                <input
                    type="text"
                    id="company"
                    name="company"
                    disabled={isPending}
                    placeholder="Robotics Inc."
                    className="h-12 w-full rounded-xl bg-background/50 border border-foreground/10 px-4 text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all disabled:opacity-50"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-muted-foreground">How can we help?</label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    disabled={isPending}
                    placeholder="Tell us about your robotic automation needs..."
                    className="w-full rounded-xl bg-background/50 border border-foreground/10 p-4 text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all resize-none disabled:opacity-50"
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="h-12 w-full mt-2 rounded-xl bg-foreground text-background font-semibold tracking-wide hover:bg-foreground/80 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
                {isPending ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-4 h-4 rounded-full border-2 text-background/30 border-t-background animate-spin" />
                        Sending...
                    </motion.div>
                ) : (
                    <>
                        Send Message
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>
        </form >
    )
}
