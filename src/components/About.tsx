import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-transparent relative z-10">
            <motion.div
                className="max-w-4xl w-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-secondary/10 flex-grow"></div>
                    <h2 className="text-4xl font-bold text-secondary font-serif uppercase tracking-wider">About Me</h2>
                    <div className="h-px bg-secondary/10 flex-grow"></div>
                </div>

                <div className="border border-secondary/10 bg-primary/50 backdrop-blur-sm p-8 rounded-sm shadow-sm">
                    <p className="text-lg text-secondary/80 leading-relaxed mb-6 font-serif">
                        I am a Computer Engineering student at Kantipur Engineering College focused on <span className="text-accent italic">AI, Machine Learning, and DevOps</span>.
                        I strive to find harmony between complex logic and minimalist design, believing that the most powerful systems are those that feel natural and intuitive.
                    </p>
                    <p className="text-lg text-secondary/80 leading-relaxed mb-6 font-serif border-l-2 border-secondary/5 pl-6 italic">
                        Beyond the code, I am fascinated by the intersection of traditional artistry and modern computation. Whether I'm optimizing a neural network or fine tuning a user interface, my goal is to create digital experiences that resonate with a sense of purpose and peace.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        <div className="p-6 border-l-2 border-accent">
                            <h3 className="font-semibold text-accent mb-4 font-serif text-xl border-b border-accent/20 pb-2">Education</h3>
                            <ul className="text-sm text-tertiary space-y-3 font-serif">
                                <li><span className="text-secondary font-bold block">2024 Present</span> Kantipur Engineering College</li>
                                <li><span className="text-secondary font-bold block">2022</span> Urbana School of Science</li>
                                <li><span className="text-secondary font-bold block">2013 2022</span> The Excelsior School</li>
                            </ul>
                        </div>
                        <div className="p-6 border-l-2 border-accent">
                            <h3 className="font-semibold text-accent mb-4 font-serif text-xl border-b border-accent/20 pb-2">Skills</h3>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xs uppercase tracking-[0.2em] text-tertiary mb-3 font-sans opacity-70">Technical</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['Git/GitHub', 'C/C++', 'Docker', 'Python', 'HTML/CSS/JS', 'Figma', 'Canva'].map((skill) => (
                                            <span key={skill} className="px-3 py-1 border border-secondary/20 text-secondary/80 rounded-sm text-xs font-serif hover:border-accent hover:text-accent transition-all duration-300">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs uppercase tracking-[0.2em] text-tertiary mb-3 font-sans opacity-70">Soft Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['Teamwork', 'Time Management', 'Effective Communication', 'Critical Thinking', 'Writing', 'Reading'].map((skill) => (
                                            <span key={skill} className="px-3 py-1 border border-secondary/20 text-secondary/80 rounded-sm text-xs font-serif hover:border-accent hover:text-accent transition-all duration-300">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
