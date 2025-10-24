"use client"

import { useState } from "react"
import { Search, Filter, MapPin, Calendar, Users, Award, Globe, GraduationCap, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Mock scholarship data
const mockScholarships = [
  {
    id: 1,
    name: "Australia Awards Scholarships",
    provider: "Australian Government",
    country: "Australia",
    type: "Government",
    amount: 50000,
    currency: "AUD",
    coverage: "Full",
    level: ["Undergraduate", "Postgraduate"],
    subjects: ["All Subjects"],
    description:
      "Prestigious scholarships offered by the Australian Government to international students from developing countries to undertake full-time undergraduate or postgraduate study at participating Australian universities.",
    eligibility: ["Minimum 2 years work experience", "English proficiency", "Academic merit", "Leadership potential"],
    applicationDeadline: "April 30, 2024",
    duration: "Full program duration",
    benefits: ["Tuition fees", "Living allowance", "Health insurance", "Return airfare"],
    numberOfAwards: 3000,
    competitiveness: "High",
    website: "https://www.australiaawards.gov.au",
    requirements: {
      gpa: 3.5,
      englishTest: "IELTS 6.5",
      workExperience: "2+ years",
    },
  },
  {
    id: 2,
    name: "Vanier Canada Graduate Scholarships",
    provider: "Government of Canada",
    country: "Canada",
    type: "Government",
    amount: 50000,
    currency: "CAD",
    coverage: "Full",
    level: ["PhD"],
    subjects: ["Health Research", "Natural Sciences", "Engineering", "Social Sciences"],
    description:
      "Canada's most prestigious doctoral scholarship program, designed to attract and retain world-class doctoral students and establish Canada as a global centre of excellence in research and higher learning.",
    eligibility: ["Nominated by Canadian institution", "Academic excellence", "Research potential", "Leadership"],
    applicationDeadline: "November 1, 2024",
    duration: "3 years",
    benefits: ["$50,000 per year", "Research support", "Conference funding"],
    numberOfAwards: 167,
    competitiveness: "Very High",
    website: "https://vanier.gc.ca",
    requirements: {
      gpa: 3.7,
      englishTest: "IELTS 7.0",
      workExperience: "Research experience",
    },
  },
  {
    id: 3,
    name: "Chevening Scholarships",
    provider: "UK Government",
    country: "UK",
    type: "Government",
    amount: 35000,
    currency: "GBP",
    coverage: "Full",
    level: ["Postgraduate"],
    subjects: ["All Subjects"],
    description:
      "The UK government's global scholarship programme, funded by the Foreign and Commonwealth Office and partner organisations. Chevening offers fully funded master's degrees in the UK.",
    eligibility: ["2+ years work experience", "Leadership potential", "Academic merit", "Return to home country"],
    applicationDeadline: "November 7, 2024",
    duration: "1 year",
    benefits: ["Tuition fees", "Monthly stipend", "Travel costs", "Visa application"],
    numberOfAwards: 1500,
    competitiveness: "High",
    website: "https://www.chevening.org",
    requirements: {
      gpa: 3.3,
      englishTest: "IELTS 6.5",
      workExperience: "2+ years",
    },
  },
  {
    id: 4,
    name: "Fulbright Foreign Student Program",
    provider: "US Government",
    country: "USA",
    type: "Government",
    amount: 45000,
    currency: "USD",
    coverage: "Full",
    level: ["Postgraduate", "PhD"],
    subjects: ["All Subjects"],
    description:
      "Provides grants for individually designed study/research projects or for university coursework leading to a master's or doctoral degree.",
    eligibility: ["Academic merit", "Leadership potential", "English proficiency", "Return home commitment"],
    applicationDeadline: "October 15, 2024",
    duration: "1-2 years",
    benefits: ["Tuition", "Living stipend", "Health insurance", "Travel allowance"],
    numberOfAwards: 4000,
    competitiveness: "High",
    website: "https://foreign.fulbrightonline.org",
    requirements: {
      gpa: 3.5,
      englishTest: "TOEFL 100",
      workExperience: "Preferred",
    },
  },
  {
    id: 5,
    name: "DAAD Scholarships",
    provider: "German Academic Exchange Service",
    country: "Germany",
    type: "Government",
    amount: 25000,
    currency: "EUR",
    coverage: "Partial",
    level: ["Postgraduate", "PhD"],
    subjects: ["Engineering", "Natural Sciences", "Social Sciences", "Arts"],
    description:
      "The German Academic Exchange Service offers various scholarship programs for international students to study in Germany.",
    eligibility: ["Academic excellence", "German language skills (some programs)", "Research proposal"],
    applicationDeadline: "October 31, 2024",
    duration: "1-4 years",
    benefits: ["Monthly stipend", "Health insurance", "Travel allowance", "Study allowance"],
    numberOfAwards: 2000,
    competitiveness: "Medium",
    website: "https://www.daad.de",
    requirements: {
      gpa: 3.0,
      englishTest: "IELTS 6.0",
      workExperience: "Not required",
    },
  },
  {
    id: 6,
    name: "Swiss Government Excellence Scholarships",
    provider: "Swiss Government",
    country: "Switzerland",
    type: "Government",
    amount: 30000,
    currency: "CHF",
    coverage: "Full",
    level: ["Postgraduate", "PhD"],
    subjects: ["All Subjects"],
    description:
      "The Swiss Government Excellence Scholarships are aimed at promoting international exchange and research cooperation between Switzerland and over 180 other countries.",
    eligibility: ["Academic merit", "Research proposal", "Language requirements"],
    applicationDeadline: "December 15, 2024",
    duration: "1-3 years",
    benefits: ["Monthly stipend", "Tuition waiver", "Health insurance", "Housing allowance"],
    numberOfAwards: 200,
    competitiveness: "High",
    website: "https://www.sbfi.admin.ch",
    requirements: {
      gpa: 3.5,
      englishTest: "IELTS 6.5",
      workExperience: "Research experience preferred",
    },
  },
]

const countries = ["All Countries", "Australia", "Canada", "UK", "USA", "Germany", "Switzerland"]
const types = ["All Types", "Government", "University", "Private", "Foundation"]
const levels = ["All Levels", "Undergraduate", "Postgraduate", "PhD"]
const subjects = [
  "All Subjects",
  "Engineering",
  "Business",
  "Medicine",
  "Computer Science",
  "Natural Sciences",
  "Social Sciences",
  "Arts",
]
const coverage = ["All Coverage", "Full", "Partial"]

export default function ScholarshipsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("All Countries")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedLevel, setSelectedLevel] = useState("All Levels")
  const [selectedSubject, setSelectedSubject] = useState("All Subjects")
  const [selectedCoverage, setSelectedCoverage] = useState("All Coverage")
  const [amountRange, setAmountRange] = useState([0, 100000])
  const [sortBy, setSortBy] = useState("deadline")

  // Filter scholarships based on search criteria
  const filteredScholarships = mockScholarships.filter((scholarship) => {
    const matchesSearch =
      scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholarship.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholarship.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCountry = selectedCountry === "All Countries" || scholarship.country === selectedCountry
    const matchesType = selectedType === "All Types" || scholarship.type === selectedType
    const matchesLevel = selectedLevel === "All Levels" || scholarship.level.includes(selectedLevel)
    const matchesSubject =
      selectedSubject === "All Subjects" ||
      scholarship.subjects.includes(selectedSubject) ||
      scholarship.subjects.includes("All Subjects")
    const matchesCoverage = selectedCoverage === "All Coverage" || scholarship.coverage === selectedCoverage
    const matchesAmount = scholarship.amount >= amountRange[0] && scholarship.amount <= amountRange[1]

    return (
      matchesSearch &&
      matchesCountry &&
      matchesType &&
      matchesLevel &&
      matchesSubject &&
      matchesCoverage &&
      matchesAmount
    )
  })

  // Sort scholarships
  const sortedScholarships = [...filteredScholarships].sort((a, b) => {
    switch (sortBy) {
      case "amount-high":
        return b.amount - a.amount
      case "amount-low":
        return a.amount - b.amount
      case "deadline":
        return new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime()
      case "name":
        return a.name.localeCompare(b.name)
      case "competitiveness":
        const competitivenessOrder = { Low: 1, Medium: 2, High: 3, "Very High": 4 }
        return competitivenessOrder[a.competitiveness] - competitivenessOrder[b.competitiveness]
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl font-serif">StudyAbroad</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="/courses" className="text-foreground hover:text-primary transition-colors">
                Find Courses
              </a>
              <a href="/universities" className="text-foreground hover:text-primary transition-colors">
                Universities
              </a>
              <a href="/scholarships" className="text-primary font-medium">
                Scholarships
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Advice
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button size="sm">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-serif mb-2">Find Scholarships</h1>
          <p className="text-muted-foreground">
            Discover funding opportunities to support your international education journey
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for scholarships, providers, or countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Mobile Filter Button */}
              <div className="lg:hidden mb-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filter Scholarships</SheetTitle>
                      <SheetDescription>Refine your search to find the perfect scholarship</SheetDescription>
                    </SheetHeader>
                    <ScholarshipFilters
                      selectedCountry={selectedCountry}
                      setSelectedCountry={setSelectedCountry}
                      selectedType={selectedType}
                      setSelectedType={setSelectedType}
                      selectedLevel={selectedLevel}
                      setSelectedLevel={setSelectedLevel}
                      selectedSubject={selectedSubject}
                      setSelectedSubject={setSelectedSubject}
                      selectedCoverage={selectedCoverage}
                      setSelectedCoverage={setSelectedCoverage}
                      amountRange={amountRange}
                      setAmountRange={setAmountRange}
                    />
                  </SheetContent>
                </Sheet>
              </div>

              {/* Desktop Filters */}
              <div className="hidden lg:block">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScholarshipFilters
                      selectedCountry={selectedCountry}
                      setSelectedCountry={setSelectedCountry}
                      selectedType={selectedType}
                      setSelectedType={setSelectedType}
                      selectedLevel={selectedLevel}
                      setSelectedLevel={setSelectedLevel}
                      selectedSubject={selectedSubject}
                      setSelectedSubject={setSelectedSubject}
                      selectedCoverage={selectedCoverage}
                      setSelectedCoverage={setSelectedCoverage}
                      amountRange={amountRange}
                      setAmountRange={setAmountRange}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {sortedScholarships.length} of {mockScholarships.length} scholarships
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deadline">Deadline (Earliest)</SelectItem>
                  <SelectItem value="amount-high">Highest Amount</SelectItem>
                  <SelectItem value="amount-low">Lowest Amount</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="competitiveness">Competitiveness</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Scholarship Cards */}
            <div className="space-y-6">
              {sortedScholarships.map((scholarship) => (
                <Card key={scholarship.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="md:col-span-2 space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h3 className="text-xl font-semibold font-serif leading-tight">{scholarship.name}</h3>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Award className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-primary font-medium">{scholarship.provider}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {scholarship.country}
                          </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed text-sm">{scholarship.description}</p>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{scholarship.coverage} Coverage</Badge>
                          <Badge variant="outline">{scholarship.type}</Badge>
                          <Badge
                            variant={
                              scholarship.competitiveness === "Very High"
                                ? "destructive"
                                : scholarship.competitiveness === "High"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {scholarship.competitiveness} Competition
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-2 text-muted-foreground" />
                            Deadline: {scholarship.applicationDeadline}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-2 text-muted-foreground" />
                            Duration: {scholarship.duration}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-2 text-muted-foreground" />
                            Awards: {scholarship.numberOfAwards}
                          </div>
                          <div className="flex items-center">
                            <GraduationCap className="h-3 w-3 mr-2 text-muted-foreground" />
                            Level: {scholarship.level.join(", ")}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium">Key Benefits:</p>
                          <div className="flex flex-wrap gap-1">
                            {scholarship.benefits.slice(0, 3).map((benefit, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {benefit}
                              </Badge>
                            ))}
                            {scholarship.benefits.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{scholarship.benefits.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
                          <div className="text-2xl font-bold text-primary">
                            {scholarship.currency} ${scholarship.amount.toLocaleString()}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {scholarship.coverage === "Full" ? "Full funding" : "Per year"}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Button className="w-full">View Details</Button>
                          <Button variant="outline" className="w-full bg-transparent">
                            Check Eligibility
                          </Button>
                          <Button variant="ghost" className="w-full">
                            Save Scholarship
                          </Button>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          <p className="font-medium mb-1">Requirements:</p>
                          <ul className="space-y-1">
                            <li>• GPA: {scholarship.requirements.gpa}+</li>
                            <li>• {scholarship.requirements.englishTest}</li>
                            <li>• {scholarship.requirements.workExperience}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            {sortedScholarships.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Scholarships
                </Button>
              </div>
            )}

            {/* No Results */}
            {sortedScholarships.length === 0 && (
              <div className="text-center py-12">
                <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No scholarships found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCountry("All Countries")
                    setSelectedType("All Types")
                    setSelectedLevel("All Levels")
                    setSelectedSubject("All Subjects")
                    setSelectedCoverage("All Coverage")
                    setAmountRange([0, 100000])
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Scholarship Filters Component
function ScholarshipFilters({
  selectedCountry,
  setSelectedCountry,
  selectedType,
  setSelectedType,
  selectedLevel,
  setSelectedLevel,
  selectedSubject,
  setSelectedSubject,
  selectedCoverage,
  setSelectedCoverage,
  amountRange,
  setAmountRange,
}: {
  selectedCountry: string
  setSelectedCountry: (value: string) => void
  selectedType: string
  setSelectedType: (value: string) => void
  selectedLevel: string
  setSelectedLevel: (value: string) => void
  selectedSubject: string
  setSelectedSubject: (value: string) => void
  selectedCoverage: string
  setSelectedCoverage: (value: string) => void
  amountRange: number[]
  setAmountRange: (value: number[]) => void
}) {
  return (
    <div className="space-y-6">
      {/* Country Filter */}
      <div className="space-y-3">
        <h4 className="font-medium">Country</h4>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Type Filter */}
      <div className="space-y-3">
        <h4 className="font-medium">Provider Type</h4>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Level Filter */}
      <div className="space-y-3">
        <h4 className="font-medium">Study Level</h4>
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {levels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Subject Filter */}
      <div className="space-y-3">
        <h4 className="font-medium">Subject Area</h4>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Coverage Filter */}
      <div className="space-y-3">
        <h4 className="font-medium">Coverage Type</h4>
        <Select value={selectedCoverage} onValueChange={setSelectedCoverage}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {coverage.map((cov) => (
              <SelectItem key={cov} value={cov}>
                {cov}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Amount Range Filter */}
      <div className="space-y-3">
        <h4 className="font-medium">Scholarship Amount</h4>
        <div className="px-2">
          <Slider
            value={amountRange}
            onValueChange={setAmountRange}
            max={100000}
            min={0}
            step={5000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>${amountRange[0].toLocaleString()}</span>
            <span>${amountRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Quick Filters */}
      <div className="space-y-3">
        <h4 className="font-medium">Quick Filters</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="full-funding" />
            <label htmlFor="full-funding" className="text-sm">
              Full Funding Only
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="no-work-exp" />
            <label htmlFor="no-work-exp" className="text-sm">
              No Work Experience Required
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="deadline-soon" />
            <label htmlFor="deadline-soon" className="text-sm">
              Deadline Within 3 Months
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
