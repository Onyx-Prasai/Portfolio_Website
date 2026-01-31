import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            title: "Proxy Catcher",
            description: "High performance network tool designed for capturing and analyzing proxy traffic.",
            tags: ["C++", "Networking", "Systems"],
        },
        {
            title: "Blood Prediction Model",
            description: "Machine learning model developed for predicting blood related health metrics and outcomes.",
            tags: ["Python", "ML", "HealthTech"],
        },
        {
            title: "Global Weather Analyzer",
            description: "Created a tool to analyze global weather patterns.",
            tags: ["Python", "Data Analysis"],
        },
        {
            title: "Onyx.h",
            description: "A C/C++ header library creation.",
            tags: ["C++", "Library"],
        },
        {
            title: "Dockerized Dev_Cluster",
            description: "Containerized development environment set up using Docker.",
            tags: ["Docker", "DevOps"],
        },
        {
            title: "learn_git",
            description: "A learning resource or tool associated with Git version control.",
            tags: ["Git", "Education"],
        },
        {
            title: "Open Source Contribution",
            description: "Active contributor to open source projects.",
            tags: ["Open Source", "Collaboration"],
        }
    ];

    return (
        <section id="projects" className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-transparent relative z-10">
            <motion.div
                className="max-w-6xl w-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-px bg-secondary/10 flex-grow"></div>
                    <h2 className="text-4xl font-bold text-secondary font-serif uppercase tracking-wider">Projects</h2>
                    <div className="h-px bg-secondary/10 flex-grow"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-primary p-8 border border-secondary/10 hover:border-accent transition-all duration-300 group shadow-sm relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 -rotate-45 translate-x-8 -translate-y-8" />
                            <h3 className="text-2xl font-black text-secondary mb-3 font-serif group-hover:text-accent transition-colors tracking-tight">{project.title}</h3>
                            <p className="text-tertiary mb-6 h-20 font-serif leading-relaxed text-sm italic">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-[10px] uppercase tracking-widest px-2 py-1 border border-accent/20 text-accent font-bold rounded-sm font-serif bg-accent/5">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-6 border-t border-secondary/5 pt-4">
                                <button className="flex items-center gap-2 text-sm text-secondary hover:text-accent transition-colors font-serif">
                                    <Github size={16} /> Code
                                </button>
                                <button className="flex items-center gap-2 text-sm text-secondary hover:text-accent transition-colors font-serif">
                                    <ExternalLink size={16} /> Demo
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Projects;
