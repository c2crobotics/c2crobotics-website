import { motion } from "framer-motion"
import { Users, Award, Lightbulb, Target } from "lucide-react"

const stats = [
  { icon: Users, label: "Students Trained", value: "1+" },
  { icon: Award, label: "Competitions Won", value: "1+" },
  { icon: Lightbulb, label: "Projects Completed", value: "1+" },
  { icon: Target, label: "Years of Excellence", value: "1+" },
]

export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About Coast 2 Coast Robotics</h2>
            <p className="text-lg text-gray-600 mb-6">
              We are a robotics education organization dedicated to inspiring the next generation of engineers,
              programmers, and innovators. Our programs ...
            </p>
            <p className="text-lg text-gray-600 mb-8">
              From beginners taking their first steps into robotics to veterans competing at the highest levels, we
              provide the tools, mentorship, and opportunities needed to succeed in STEM fields.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img
                src="/logo.png?height=500&width=500"
                alt="Coast 2 Coast Robotics team"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
