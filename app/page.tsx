"use client"

import type React from "react"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Clock, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageSlider } from "@/components/image-slider"
import { TestimonialSlider } from "@/components/testimonial-slider"

// Animated Section Component
interface AnimatedSectionProps {
  id?: string
  className?: string
  children: React.ReactNode
}

function AnimatedSection({ id, className, children }: AnimatedSectionProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// Section Header Component
interface SectionHeaderProps {
  title: string
  subtitle: string
}

function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="text-lg text-gray-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {subtitle}
      </motion.p>
    </div>
  )
}

// Service Card Component
interface ServiceCardProps {
  title: string
  price: string
  description: string
  image: string
}

function ServiceCard({ title, price, description, image }: ServiceCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="h-48 relative">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <span className="text-pink-500 font-bold">{price}</span>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <Button variant="outline" className="w-full border-pink-500 text-pink-500 hover:bg-pink-50">
          Book Now
        </Button>
      </div>
    </motion.div>
  )
}

// Testimonial Card Component
interface TestimonialCardProps {
  name: string
  quote: string
  image: string
  rating: number
}

function TestimonialCard({ name, quote, image, rating }: TestimonialCardProps) {
  return (
    <motion.div className="bg-white p-6 rounded-lg shadow-md" whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden relative">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill={i < rating ? "currentColor" : "none"}
                stroke="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 italic">"{quote}"</p>
    </motion.div>
  )
}

export default function Home() {
  // Smooth scroll function
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.png"
            alt="Nail art background"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-pink-100/50 to-pink-200/70"></div>
        </div>

        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
                NE
              </div>
              <span className="text-xl font-semibold">NailElegance</span>
            </div>
            <div className="hidden md:flex gap-8">
              <Link
                href="#home"
                onClick={(e) => handleSmoothScroll(e, "home")}
                className="text-gray-700 hover:text-pink-500 transition-colors"
              >
                Home
              </Link>
              <Link
                href="#services"
                onClick={(e) => handleSmoothScroll(e, "services")}
                className="text-gray-700 hover:text-pink-500 transition-colors"
              >
                Services
              </Link>
              <Link
                href="#gallery"
                onClick={(e) => handleSmoothScroll(e, "gallery")}
                className="text-gray-700 hover:text-pink-500 transition-colors"
              >
                Gallery
              </Link>
              <Link
                href="#testimonials"
                onClick={(e) => handleSmoothScroll(e, "testimonials")}
                className="text-gray-700 hover:text-pink-500 transition-colors"
              >
                Testimonials
              </Link>
              <Link
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "contact")}
                className="text-gray-700 hover:text-pink-500 transition-colors"
              >
                Contact
              </Link>
            </div>
            <Button className="bg-pink-500 hover:bg-pink-600">Book Now</Button>
          </div>
        </nav>

        <div className="container mx-auto px-4 z-10 text-center" id="home">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              Elevate Your Style With Beautiful Nail Extensions
            </h1>
            <p className="text-xl text-gray-600 mb-8">Professional nail art and extensions that make a statement</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-pink-500 hover:bg-pink-600 text-lg py-6 px-8">Book Appointment</Button>
              <Button variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-50 text-lg py-6 px-8">
                View Services
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          onClick={(e) => handleSmoothScroll(e as any, "services")}
        >
          <ChevronDown className="w-10 h-10 text-pink-500" />
        </motion.div>
      </section>

      {/* Services Section */}
      <AnimatedSection id="services" className="py-20 bg-white w-full">
        <div className="container mx-auto px-4">
          <SectionHeader title="Our Services" subtitle="Discover our range of premium nail extension services" />

          <Tabs defaultValue="extensions" className="max-w-4xl mx-auto mt-12">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="extensions">Extensions</TabsTrigger>
              <TabsTrigger value="art">Nail Art</TabsTrigger>
              <TabsTrigger value="care">Nail Care</TabsTrigger>
            </TabsList>
            <TabsContent value="extensions">
              <div className="grid md:grid-cols-2 gap-6">
                <ServiceCard
                  title="Acrylic Extensions"
                  price="$45"
                  description="Durable acrylic extensions that look natural and feel comfortable."
                  image="/images/service-acrylic.png"
                />
                <ServiceCard
                  title="Gel Extensions"
                  price="$50"
                  description="Lightweight gel extensions with a glossy, natural finish."
                  image="/images/service-gel.png"
                />
                <ServiceCard
                  title="Polygel Extensions"
                  price="$55"
                  description="The perfect blend of acrylic and gel for strong yet flexible nails."
                  image="/images/service-polygel.png"
                />
                <ServiceCard
                  title="Dip Powder Extensions"
                  price="$48"
                  description="Long-lasting, odor-free extensions with vibrant color options."
                  image="/images/service-dip.png"
                />
              </div>
            </TabsContent>
            <TabsContent value="art">
              <div className="grid md:grid-cols-2 gap-6">
                <ServiceCard
                  title="3D Nail Art"
                  price="$35"
                  description="Stunning three-dimensional designs for a unique look."
                  image="/placeholder.svg?height=300&width=400"
                />
                <ServiceCard
                  title="Hand-Painted Designs"
                  price="$30"
                  description="Custom hand-painted nail art tailored to your style."
                  image="/placeholder.svg?height=300&width=400"
                />
                <ServiceCard
                  title="Rhinestone & Gems"
                  price="$25"
                  description="Add sparkle with premium rhinestones and gem applications."
                  image="/placeholder.svg?height=300&width=400"
                />
                <ServiceCard
                  title="Chrome & Holographic"
                  price="$28"
                  description="Eye-catching chrome finishes and holographic effects."
                  image="/placeholder.svg?height=300&width=400"
                />
              </div>
            </TabsContent>
            <TabsContent value="care">
              <div className="grid md:grid-cols-2 gap-6">
                <ServiceCard
                  title="Nail Repair"
                  price="$20"
                  description="Professional repair for damaged or broken nails."
                  image="/placeholder.svg?height=300&width=400"
                />
                <ServiceCard
                  title="Cuticle Treatment"
                  price="$15"
                  description="Nourishing treatment for healthy, beautiful cuticles."
                  image="/placeholder.svg?height=300&width=400"
                />
                <ServiceCard
                  title="Nail Strengthening"
                  price="$25"
                  description="Treatments to strengthen weak or brittle nails."
                  image="/placeholder.svg?height=300&width=400"
                />
                <ServiceCard
                  title="Extension Removal"
                  price="$18"
                  description="Safe and gentle removal of existing nail extensions."
                  image="/placeholder.svg?height=300&width=400"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </AnimatedSection>

      {/* Gallery Section */}
      <AnimatedSection id="gallery" className="py-20 bg-pink-50 w-full">
        <div className="container mx-auto px-4">
          <SectionHeader title="Our Gallery" subtitle="Browse our latest nail extension designs and creations" />

          <div className="mt-12 max-w-4xl mx-auto">
            <ImageSlider
              images={[
                { src: "/images/nail-1.png", alt: "Elegant pink nail extensions", title: "Elegant Pink Extensions" },
                { src: "/images/nail-2.png", alt: "Glitter accent nail design", title: "Glitter Accent Design" },
                { src: "/images/nail-3.png", alt: "French tip nail extensions", title: "Classic French Tips" },
                { src: "/images/nail-4.png", alt: "Rhinestone nail art", title: "Rhinestone Glamour" },
                { src: "/images/nail-5.png", alt: "Ombre nail extensions", title: "Soft Ombre Fade" },
                { src: "/images/nail-6.png", alt: "Geometric nail art", title: "Geometric Patterns" },
                { src: "/images/nail-7.png", alt: "Floral nail design", title: "Delicate Floral Art" },
                { src: "/images/nail-8.png", alt: "Marble effect nails", title: "Marble Effect Luxury" },
              ]}
              aspectRatio="video"
              showDots={true}
              showArrows={true}
              autoPlay={true}
              interval={4000}
              className="rounded-xl overflow-hidden shadow-lg"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square relative rounded-lg overflow-hidden shadow-md">
                <Image
                  src={`/images/nail-${i + 1}.png`}
                  alt={`Nail design thumbnail ${i + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-50">
              View All Designs
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection id="testimonials" className="py-20 bg-white w-full">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Client Testimonials"
            subtitle="What our clients say about our nail extension services"
          />

          <div className="max-w-2xl mx-auto mt-12">
            <TestimonialSlider
              testimonials={[
                <TestimonialCard
                  key="testimonial-1"
                  name="Sarah Johnson"
                  quote="The gel extensions I got were absolutely perfect! They lasted for weeks and looked so natural. Definitely coming back!"
                  image="/placeholder.svg?height=100&width=100"
                  rating={5}
                />,
                <TestimonialCard
                  key="testimonial-2"
                  name="Emily Davis"
                  quote="I love the 3D nail art designs. Everyone asks me where I got my nails done. The attention to detail is amazing!"
                  image="/placeholder.svg?height=100&width=100"
                  rating={5}
                />,
                <TestimonialCard
                  key="testimonial-3"
                  name="Jessica Williams"
                  quote="Best nail extensions I've ever had. The staff is professional and the salon is so clean and beautiful."
                  image="/placeholder.svg?height=100&width=100"
                  rating={4}
                />,
                <TestimonialCard
                  key="testimonial-4"
                  name="Michelle Thompson"
                  quote="I'm absolutely in love with my new nail extensions! The technician was so patient and helped me choose the perfect design."
                  image="/placeholder.svg?height=100&width=100"
                  rating={5}
                />,
                <TestimonialCard
                  key="testimonial-5"
                  name="Amanda Parker"
                  quote="The polygel extensions are amazing - so lightweight yet durable. I've been getting compliments everywhere I go!"
                  image="/placeholder.svg?height=100&width=100"
                  rating={5}
                />,
              ]}
              showDots={true}
              showArrows={true}
              autoPlay={true}
              interval={6000}
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection id="contact" className="py-20 bg-pink-50 w-full">
        <div className="container mx-auto px-4">
          <SectionHeader title="Contact Us" subtitle="Book your appointment or get in touch with our team" />

          <div className="grid md:grid-cols-2 gap-10 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-6">Book an Appointment</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    Service
                  </label>
                  <select
                    id="service"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="">Select a service</option>
                    <option value="acrylic">Acrylic Extensions</option>
                    <option value="gel">Gel Extensions</option>
                    <option value="polygel">Polygel Extensions</option>
                    <option value="dip">Dip Powder Extensions</option>
                    <option value="art">Nail Art</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    id="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requests
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Any special requests or questions"
                  ></textarea>
                </div>
                <Button className="w-full bg-pink-500 hover:bg-pink-600">Book Appointment</Button>
              </form>
            </div>

            <div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-2xl font-semibold mb-6">Visit Our Salon</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-pink-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p className="text-gray-600">
                        123 Beauty Street, Suite 100
                        <br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-pink-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-gray-600">(123) 456-7890</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-pink-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Hours</h4>
                      <p className="text-gray-600">
                        Monday - Friday: 9am - 7pm
                        <br />
                        Saturday: 10am - 6pm
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md h-64 flex items-center justify-center">
                <p className="text-gray-500">Map placeholder - Google Maps would be embedded here</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 w-full">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
                  NE
                </div>
                <span className="text-xl font-semibold">NailElegance</span>
              </div>
              <p className="text-gray-400">
                Premium nail extension services with the highest quality products and techniques.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#home"
                    onClick={(e) => handleSmoothScroll(e, "home")}
                    className="text-gray-400 hover:text-pink-400 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#services"
                    onClick={(e) => handleSmoothScroll(e, "services")}
                    className="text-gray-400 hover:text-pink-400 transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="#gallery"
                    onClick={(e) => handleSmoothScroll(e, "gallery")}
                    className="text-gray-400 hover:text-pink-400 transition-colors"
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    href="#testimonials"
                    onClick={(e) => handleSmoothScroll(e, "testimonials")}
                    className="text-gray-400 hover:text-pink-400 transition-colors"
                  >
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    onClick={(e) => handleSmoothScroll(e, "contact")}
                    className="text-gray-400 hover:text-pink-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                    Acrylic Extensions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                    Gel Extensions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                    Polygel Extensions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                    Nail Art
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                    Nail Care
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex gap-4 mb-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-pink-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-pink-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-pink-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
              </div>
              <p className="text-gray-400">
                Subscribe to our newsletter for the latest nail trends and special offers.
              </p>

              <div className="flex mt-4">
                <input
                  type="email"
                  className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-pink-500 w-full"
                  placeholder="Your email address"
                />
                <Button className="rounded-l-none bg-pink-500 hover:bg-pink-600">Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} NailElegance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

