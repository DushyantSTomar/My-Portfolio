import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './BlogDetail.module.scss';
import { motion } from 'framer-motion';
import { blogContentData } from '../data/blogContent';

const defaultBlog = {
    title: "Placeholder Blog Post",
    author: "Dushyant Tomar",
    date: "Current Date",
    heroImg: "/assets/projects/green-samriddhi/1.webp",
    content: "Detailed content mapped to this specific blog topic will be populated here. It includes paragraphs, insights, and analysis.",
    takeaways: [
        "Takeaway point one.",
        "Takeaway point two."
    ]
};

const BlogDetail = () => {
    const { id } = useParams();
    const blog = blogContentData[id] || defaultBlog;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const parseInline = (text) => {
        if (!text) return text;
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, idx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={idx}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <section className={styles.blogDetailSection}>
            <div className={styles.container}>
                <motion.div
                    className={styles.backNav}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Link to="/blogs" className={styles.backLink}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back to Blogs
                    </Link>
                </motion.div>

                <motion.nav
                    className={styles.breadcrumbs}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link to="/" className={styles.crumbLink}>Home</Link>
                    <span className={styles.separator}>/</span>
                    <Link to="/blogs" className={styles.crumbLink}>Blogs</Link>
                    <span className={styles.separator}>/</span>
                    <span className={styles.crumbCurrent}>{blog.title}</span>
                </motion.nav>

                <motion.div
                    className={styles.heroImage}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <img src={blog.heroImg} alt={blog.title} />
                </motion.div>

                <motion.div
                    className={styles.contentWrapper}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1 className={styles.title}>{blog.title}</h1>
                    <div className={styles.meta}>
                        <span className={styles.author}>{blog.author}</span>
                        <span className={styles.dot}>&bull;</span>
                        <span className={styles.date}>{blog.date}</span>
                    </div>

                    {blog.suggestedImageIdea && (
                        <div style={{ padding: '12px 18px', background: 'rgba(255,255,255,0.03)', borderLeft: '3px solid #00f2fe', borderRadius: '4px', marginBottom: '30px', fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                            <strong>📸 Cover Image Idea:</strong> {blog.suggestedImageIdea}
                        </div>
                    )}

                    <div className={styles.bodyContent}>
                        {(() => {
                            const lines = blog.content.split('\n');
                            const elements = [];
                            let inCodeBlock = false;
                            let codeLines = [];

                            for (let i = 0; i < lines.length; i++) {
                                const line = lines[i];
                                if (line.startsWith('\`\`\`')) {
                                    if (inCodeBlock) {
                                        elements.push(
                                            <div key={`code-${i}`} className={styles.codeBlockPlaceholder}>
                                                <pre><code>{codeLines.join('\n')}</code></pre>
                                            </div>
                                        );
                                        codeLines = [];
                                        inCodeBlock = false;
                                    } else {
                                        inCodeBlock = true;
                                    }
                                } else if (inCodeBlock) {
                                    codeLines.push(line);
                                } else if (line.startsWith('### ')) {
                                    elements.push(<h3 key={`h3-${i}`}>{parseInline(line.replace('### ', ''))}</h3>);
                                } else if (line.startsWith('> ')) {
                                    elements.push(
                                        <blockquote key={`bq-${i}`} className={styles.blockquote}>
                                            {parseInline(line.replace('> ', ''))}
                                        </blockquote>
                                    );
                                } else if (line.startsWith('- ')) {
                                    elements.push(<li key={`li-${i}`} className={styles.listItem}>{parseInline(line.replace('- ', ''))}</li>);
                                } else if (line.trim() !== '') {
                                    elements.push(<p key={`p-${i}`}>{parseInline(line)}</p>);
                                }
                            }
                            return elements;
                        })()}
                    </div>

                    <div className={styles.takeawaysBox}>
                        <h3>Key Takeaways</h3>
                        <ul>
                            {blog.takeaways.map((item, idx) => (
                                <li key={idx}>{parseInline(item)}</li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.disclaimer}>
                        <p>These are research notes curated and summarized from multiple sources and production experience.</p>
                    </div>

                    <div className={styles.ctaBox}>
                        <a
                            href="https://www.linkedin.com/in/dushyant-tomar-2079a8249/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.btnPrimary}
                        >
                            Follow for more research notes
                        </a>
                    </div>
                </motion.div >
            </div >
        </section >
    );
};

export default BlogDetail;
