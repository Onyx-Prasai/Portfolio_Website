import { motion } from 'framer-motion';

const Experience = () => {
    const experiences = [
        {
            title: "AI ART Prompting Competition",
            year: "2024",
            description: "Won the competition"
        },
        {
            title: "AI Debate Competition",
            year: "2024",
            description: "Participated as a competitor."
        },
        {
            title: "Nova Hackathon",
            year: "2026",
            description: "Attended the hackathon."
        }
    ];

    const conferences = [
        "Notion workshop",
        "GDG conference 2025",
        "AI/ML bootcamp at KEC",
        "Bar Camp",
        "AWS workshops",
        "Antigenic AI workshop",
        "UBUCON ASIA 2025",
        "Azure and AWS cloud workshop"
    ];

    return (
        <section id="experience" className="min-h-screen w-full flex flex-col items-center justify-center p-8 relative z-10">
            <motion.div
                className="max-w-4xl w-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-px bg-secondary/10 flex-grow"></div>
                    <h2 className="text-4xl font-bold text-secondary font-serif uppercase tracking-wider text-center">Experience</h2>
                    <div className="h-px bg-secondary/10 flex-grow"></div>
                </div>

                <div className="space-y-12 relative before:content-[''] before:absolute before:left-4 md:before:left-1/2 before:top-0 before:h-full before:w-px before:bg-secondary/10">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col md:flex-row gap-8 relative"
                        >
                            <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right pr-8' : 'md:order-2 md:pl-8'}`}>
                                <h3 className="text-xl font-bold text-secondary font-serif">{exp.title}</h3>
                                <div className="text-accent font-serif text-sm mb-2">{exp.year}</div>
                                <p className="text-tertiary font-serif">{exp.description}</p>
                            </div>

                            {/* Center Dot */}
                            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 bg-accent rounded-full border-2 border-secondary top-2 z-10"></div>

                            <div className={`md:w-1/2 ${index % 2 === 0 ? 'hidden md:block' : 'md:order-1'}`}></div>
                        </motion.div>
                    ))}
                </div>

                <h3 className="text-2xl font-bold mt-20 mb-10 text-center text-secondary font-serif">Conferences Attended</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {conferences.map((conf, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="border-b border-secondary/10 p-3 flex items-center gap-3 hover:pl-5 transition-all duration-300"
                        >
                            <div className="w-1.5 h-1.5 rotate-45 bg-accent"></div>
                            <span className="text-secondary/80 font-serif">{conf}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Experience;
