import { delay, motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeInOut",
        },
    },
}

export default function Terms() { 
    return (
        <motion.main
            className="container mx-auto py-12 px-4 md:px-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl text-center'>TERMS OF SERVICE</h1>
            <p>

            </p>

            {/* will continue */}
            
        </motion.main>
    )
}