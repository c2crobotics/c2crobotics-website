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

export default function PrivacyPolicy() { 
    return (
        <motion.main
            className="container mx-auto py-12 px-4 md:px-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl text-center'>PRIVACY POLICY</h1>
            <p>
                Coast 2 Coast Robotics {`C2C Robotics or C2C`} ("us", "we", or "our") operates the https://www.c2crobotics.com and www.coast2coastrobotics.com websites. These sites and/or its affiliate sites shall be deemed the "Service".
                <br/> This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. 
                <br/> We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from <a href='https://www.c2crobotics.com'>https://www.c2crobotics.com</a>.

            </p>

            {/* will continue */}
        </motion.main>
    )
}