import { motion } from "motion/react"
import type { PricingTier } from "../constants"
import { Check } from "lucide-react"

interface CardProps {
    tier: PricingTier
    index: number
}

const Card = ({ tier, index }: CardProps) => {
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: index * 0.15,
            ease: "easeOut",
        },
        },
        hover: {
        y: -10,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
        transition: { duration: 0.3 },
        },
    }
    const featuresVariants = {
        hidden: { opacity: 0 },
        visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.3 + index * 0.15,
        },
        },
    }
    const featureVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    }

    return (
        <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, margin: "-100px" }}
        className={`relative h-full rounded-3xl overflow-hidden transition-all duration-300 ${
            tier.highlighted
            ? "bg-linear-to-br from-white via-gray-50 to-gray-100 ring-2 ring-blue-500 md:scale-105"
            : "bg-white hover:shadow-2xl"
        } shadow-lg`}
        >
        {/* Background gradient overlay for featured */}
        {tier.highlighted && (
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full -mr-48 -mt-48 opacity-50 pointer-events-none" />
        )}
        <div className="relative z-10 p-8 md:p-10">
            {/* Header */}
            <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                {tier.name}
            </h3>
            <p className="text-sm text-gray-600">{tier.description}</p>
            </div>
            {/* Price */}
            <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.15 }}
            viewport={{ once: true }}
            className="mb-8"
            >
            <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-6xl font-bold text-gray-900">
                ${tier.price}
                </span>
                <span className="text-gray-600 text-lg">{tier.period}</span>
            </div>
            </motion.div>
            {/* CTA Button */}
            <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 mb-10 ${
                tier.highlighted
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
            >
            {tier.ctaText}
            </motion.button>
            {/* Features */}
            <div className="border-t border-gray-200 pt-8">
            <p className="text-sm font-semibold text-gray-900 mb-6">
                What's included
            </p>
            <motion.ul
                variants={featuresVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
            >
                {tier.features.map((feature, featureIndex) => (
                <motion.li
                    key={featureIndex}
                    variants={featureVariants}
                    className="flex items-start gap-3"
                >
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                </motion.li>
                ))}
            </motion.ul>
            </div>
        </div>
        </motion.div>
    )
}

export default Card