"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  FileText,
  Users,
  MessageCircle,
  Phone,
  Mail,
  CheckCircle,
  Clock,
  DollarSign,
  Globe,
  BookOpen,
  Award,
} from "lucide-react"

const serviceCategories = [
  {
    id: "application",
    title: "Application Services",
    icon: FileText,
    description: "Complete university application assistance",
  },
  {
    id: "consultation",
    title: "Study Consultation",
    icon: MessageCircle,
    description: "Professional guidance and counseling",
  },
  {
    id: "visa",
    title: "Visa Services",
    icon: Globe,
    description: "Student visa application support",
  },
  {
    id: "accommodation",
    title: "Accommodation",
    icon: Users,
    description: "Housing and dormitory arrangements",
  },
  {
    id: "language",
    title: "Language Support",
    icon: BookOpen,
    description: "Chinese language learning programs",
  },
  {
    id: "scholarship",
    title: "Scholarship Guidance",
    icon: Award,
    description: "Financial aid and scholarship applications",
  },
]

const serviceDetails = {
  application: {
    title: "University Application Service",
    overview:
      "Our comprehensive application service helps international students navigate the complex process of applying to Chinese universities. We provide end-to-end support from university selection to enrollment confirmation.",
    features: [
      "University selection based on your academic background and preferences",
      "Application document preparation and review",
      "Direct submission to partner universities",
      "Application status tracking and updates",
      "Admission letter processing",
      "Enrollment guidance and support",
    ],
    process: [
      "Initial consultation and profile assessment",
      "University selection and program matching",
      "Document preparation and verification",
      "Application submission and tracking",
      "Interview preparation (if required)",
      "Admission confirmation and next steps",
    ],
    fees: {
      basic: "¥2,000 - ¥3,000",
      premium: "¥4,000 - ¥6,000",
      vip: "¥8,000 - ¥12,000",
    },
    timeline: "4-8 weeks",
    universities: [
      "Tsinghua University",
      "Peking University",
      "Fudan University",
      "Shanghai Jiao Tong University",
      "Zhejiang University",
      "University of Science and Technology of China",
    ],
  },
  consultation: {
    title: "Professional Study Consultation",
    overview:
      "Get expert advice from our experienced education consultants who understand the Chinese education system and can guide you through every step of your study abroad journey.",
    features: [
      "One-on-one consultation sessions",
      "Academic pathway planning",
      "Career guidance and prospects",
      "Cultural adaptation support",
      "Pre-departure briefings",
      "Ongoing support during studies",
    ],
    process: [
      "Initial assessment and goal setting",
      "Academic background evaluation",
      "University and program recommendations",
      "Application strategy development",
      "Timeline and milestone planning",
      "Continuous support and guidance",
    ],
    fees: {
      basic: "¥500 - ¥800 per session",
      package: "¥3,000 - ¥5,000 (10 sessions)",
      comprehensive: "¥8,000 - ¥15,000 (full support)",
    },
    timeline: "Ongoing support",
    consultants: [
      "Education specialists with 10+ years experience",
      "Former university admissions officers",
      "Bilingual consultants (Chinese/English)",
      "Subject-specific academic advisors",
    ],
  },
  visa: {
    title: "Student Visa Services",
    overview:
      "Navigate the Chinese student visa application process with confidence. Our visa specialists ensure your X1/X2 visa application is complete and submitted correctly.",
    features: [
      "Visa type determination (X1/X2)",
      "Document checklist and preparation",
      "Application form completion",
      "Embassy appointment scheduling",
      "Interview preparation and coaching",
      "Visa status tracking and updates",
    ],
    process: [
      "Visa eligibility assessment",
      "Required documents preparation",
      "Application form completion",
      "Embassy appointment booking",
      "Application submission support",
      "Visa collection and verification",
    ],
    fees: {
      consultation: "¥300 - ¥500",
      full_service: "¥1,500 - ¥2,500",
      express: "¥3,000 - ¥4,000",
    },
    timeline: "2-4 weeks",
    requirements: [
      "Valid passport (6+ months validity)",
      "University admission letter",
      "JW201/JW202 form",
      "Physical examination record",
      "Financial proof documents",
      "Passport photos and application forms",
    ],
  },
}

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState("application")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Study in China Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive support services to help international students successfully apply to and study at Chinese
            universities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Service Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Our Services</CardTitle>
                <CardDescription>Choose a service to learn more</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {serviceCategories.map((category) => {
                    const Icon = category.icon
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedService(category.id)}
                        className={`w-full text-left p-4 rounded-lg transition-colors ${
                          selectedService === category.id
                            ? "bg-cyan-50 text-cyan-700 border-l-4 border-cyan-500"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium">{category.title}</div>
                            <div className="text-sm text-gray-500 mt-1">{category.description}</div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-cyan-600" />
                  <span className="text-sm">+86 400-123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-cyan-600" />
                  <span className="text-sm">info@studyinchina.com</span>
                </div>
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Contact Us</Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {serviceDetails[selectedService] && (
              <div className="space-y-8">
                {/* Service Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">{serviceDetails[selectedService].title}</CardTitle>
                      <Badge variant="secondary" className="bg-cyan-100 text-cyan-800">
                        Professional Service
                      </Badge>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      {serviceDetails[selectedService].overview}
                    </CardDescription>
                  </CardHeader>
                </Card>

                {/* Service Features */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Service Features</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {serviceDetails[selectedService].features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Process Steps */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span>Service Process</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {serviceDetails[selectedService].process.map((step, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Pricing and Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        <span>Service Fees</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(serviceDetails[selectedService].fees).map(([type, fee]) => (
                          <div key={type} className="flex justify-between items-center">
                            <span className="text-sm font-medium capitalize">{type.replace("_", " ")}</span>
                            <span className="text-sm text-cyan-600 font-medium">{fee}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <span>Timeline</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-600 mb-2">
                          {serviceDetails[selectedService].timeline}
                        </div>
                        <p className="text-sm text-gray-600">Average processing time</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Additional Information */}
                {serviceDetails[selectedService].universities && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <GraduationCap className="h-5 w-5 text-purple-600" />
                        <span>Partner Universities</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {serviceDetails[selectedService].universities.map((university, index) => (
                          <Badge key={index} variant="outline" className="justify-center p-2">
                            {university}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* CTA Section */}
                <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
                  <CardContent className="text-center py-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h3>
                    <p className="text-gray-600 mb-6">Get personalized guidance from our education experts</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                        Book Consultation
                      </Button>
                      <Button size="lg" variant="outline">
                        Download Brochure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
