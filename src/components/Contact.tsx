import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin } from 'lucide-react';

const Contact = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        const mailtoLink = `mailto:onyxefforts@gmail.com?subject=Contact from ${name}&body=From: ${name} (${email})%0D%0A%0D%0A${message}`;
        window.location.href = mailtoLink;
    };

    return (
        <section id="contact" className="min-h-screen w-full flex flex-col items-center justify-center p-8 relative z-10 pb-20">
            <motion.div
                className="max-w-4xl w-full flex flex-col md:flex-row gap-16"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
            >
                <div className="md:w-1/2">
                    <h2 className="text-4xl font-bold mb-6 text-secondary font-serif uppercase tracking-wider">Get In Touch</h2>
                    <p className="text-tertiary mb-10 font-serif leading-relaxed">
                        The journey begins with a conversation. Feel free to reach out.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-center gap-6 group">
                            <div className="text-accent group-hover:scale-110 transition-transform duration-300">
                                <Mail size={24} strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-tertiary mb-1 font-sans">Email</p>
                                <a href="mailto:onyxefforts@gmail.com" className="text-secondary font-serif font-bold hover:text-accent transition-colors">
                                    onyxefforts@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 group">
                            <div className="text-accent group-hover:scale-110 transition-transform duration-300">
                                <MapPin size={24} strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-tertiary mb-1 font-sans">Location</p>
                                <p className="text-secondary font-serif font-bold">Kathmandu, Nepal</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 group">
                            <div className="text-accent group-hover:scale-110 transition-transform duration-300">
                                <Github size={24} strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-tertiary mb-1 font-sans">Github</p>
                                <a href="https://github.com/Onyx-Prasai" target="_blank" rel="noopener noreferrer" className="text-secondary font-serif font-bold hover:text-accent transition-colors">
                                    github.com/Onyx-Prasai
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 group">
                            <div className="text-accent group-hover:scale-110 transition-transform duration-300">
                                <Linkedin size={24} strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-tertiary mb-1 font-sans">LinkedIn</p>
                                <a href="https://www.linkedin.com/in/onyx-prasai-99a16934a/" target="_blank" rel="noopener noreferrer" className="text-secondary font-serif font-bold hover:text-accent transition-colors">
                                    linkedin.com/in/onyx-prasai
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="md:w-1/2 bg-primary/50 p-8 border border-secondary/10 shadow-sm relative overflow-hidden group/form">
                    <div className="mb-6">
                        <label className="block text-secondary text-sm mb-2 font-serif uppercase tracking-wider">Name</label>
                        <input name="name" type="text" required className="w-full bg-transparent border-b border-secondary/30 p-3 text-secondary focus:outline-none focus:border-accent transition-colors font-serif placeholder:text-tertiary/50" placeholder="Your Name" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-secondary text-sm mb-2 font-serif uppercase tracking-wider">Email</label>
                        <input name="email" type="email" required className="w-full bg-transparent border-b border-secondary/30 p-3 text-secondary focus:outline-none focus:border-accent transition-colors font-serif placeholder:text-tertiary/50" placeholder="your@email.com" />
                    </div>
                    <div className="mb-8">
                        <label className="block text-secondary text-sm mb-2 font-serif uppercase tracking-wider">Message</label>
                        <textarea name="message" required className="w-full bg-transparent border-b border-secondary/30 p-3 text-secondary h-32 focus:outline-none focus:border-accent transition-colors font-serif placeholder:text-tertiary/50 resize-none" placeholder="Your message..."></textarea>
                    </div>
                    <button type="submit" className="w-full bg-secondary text-primary font-serif py-4 hover:bg-accent transition-all duration-300 tracking-widest uppercase text-sm relative z-10 group-hover/form:shadow-[0_0_20px_rgba(138,28,28,0.3)]">
                        Send Message
                    </button>
                    {/* Background Ink Streak */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl -z-10 group-hover/form:bg-accent/10 transition-colors" />
                </form>
            </motion.div>
        </section>
    );
};

export default Contact;
