"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Award, Globe, Heart, MapPin, Star, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"


const mockSchools = [
  {
    id: 1,
    name: "清华大学",
    location: "Beijing",
    type: "Public",
    ranking: 17,
    rating: 4.8,
    students: 51000,
    internationalStudents: 15,
    fees: 25000,
    subjects: ["Engineering", "Computer Science", "Business"],
    image: "/tsinghua-university-campus-beijing.jpg",
  },
  {
    id: 2,
    name: "北京大学",
    location: "Beijing",
    type: "Public",
    ranking: 12,
    rating: 4.9,
    students: 45000,
    internationalStudents: 18,
    fees: 23000,
    subjects: ["Liberal Arts", "Medicine", "Law"],
    image: "/peking-university-campus-beijing.jpg",
  },
  {
    id: 3,
    name: "复旦大学",
    location: "Shanghai",
    type: "Public",
    ranking: 34,
    rating: 4.7,
    students: 32000,
    internationalStudents: 12,
    fees: 24000,
    subjects: ["Economics", "International Relations", "Medicine"],
    image: "/fudan-university-campus-shanghai.jpg",
  },
  {
    id: 4,
    name: "上海交通大学",
    location: "Shanghai",
    type: "Public",
    ranking: 46,
    rating: 4.6,
    students: 38000,
    internationalStudents: 14,
    fees: 26000,
    subjects: ["Engineering", "Business", "Medicine"],
    image: "/shanghai-jiao-tong-university-campus.jpg",
  },
  {
    id: 5,
    name: "浙江大学",
    location: "Hangzhou",
    type: "Public",
    ranking: 42,
    rating: 4.7,
    students: 58000,
    internationalStudents: 10,
    fees: 22000,
    subjects: ["Engineering", "Computer Science", "Agriculture"],
    image: "/zhejiang-university-campus-hangzhou.jpg",
  },
  {
    id: 6,
    name: "中国科学技术大学",
    location: "Hefei",
    type: "Public",
    ranking: 89,
    rating: 4.5,
    students: 18000,
    internationalStudents: 8,
    fees: 21000,
    subjects: ["Physics", "Chemistry", "Computer Science"],
    image: "/university-of-science-and-technology-china-campus.jpg",
  },
  {
    id: 7,
    name: "南京大学",
    location: "Nanjing",
    type: "Public",
    ranking: 133,
    rating: 4.6,
    students: 33000,
    internationalStudents: 11,
    fees: 23000,
    subjects: ["Liberal Arts", "Natural Sciences", "Engineering"],
    image: "/nanjing-university-campus.jpg",
  },
  {
    id: 8,
    name: "华中科技大学",
    location: "Wuhan",
    type: "Public",
    ranking: 176,
    rating: 4.4,
    students: 56000,
    internationalStudents: 9,
    fees: 20000,
    subjects: ["Engineering", "Medicine", "Management"],
    image: "/huazhong-university-science-technology-campus-wuha.jpg",
  },
].sort((a, b) => a.name.localeCompare(b.name, "zh-CN"))

export default function HomePage() {
  const router = useRouter()

  const handleViewUniversity = (universityId: number) => {
    router.push(`/universities/${universityId}`)
  }

  return (
    
    <div className="min-h-screen bg-background animate-fade-in">
      <Navigation />
      {/* // 头图部分 */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/placeholder.svg?height=1080&width=1920"
            alt="Great Wall and Shanghai skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 animate-fade-in">
            Discover Study Opportunities in China
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">World-Class Education Awaits!</p>
          <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
            <a href="/courses">Explore Courses</a>
          </Button>
        </div>
      </section>
          
      {/* // 虚拟校园导览 */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-serif mb-8">Virtual Campus Tour</h2>
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Beijing University Campus Tour"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="mt-4 text-muted-foreground">Take a virtual tour of Beijing University campus</p>
        </div>
      </section>
      {/* // 优势展示部分 */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold font-serif text-center mb-12">Why Study in China?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="w-12 h-12 text-primary" />,
                title: "Affordability",
                description: "Quality education at competitive costs with numerous scholarship opportunities",
              },
              {
                icon: <Heart className="w-12 h-12 text-primary" />,
                title: "Rich Culture",
                description: "Immerse yourself in 5,000 years of history and vibrant modern culture",
              },
              {
                icon: <Globe className="w-12 h-12 text-primary" />,
                title: "Innovation Hub",
                description: "Study in the world's second-largest economy and technology powerhouse",
              },
            ].map((item, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-all">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold font-serif mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* 国际学生展示部分 */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-serif mb-4">Join 500,000+ International Students</h2>
            <p className="text-xl text-muted-foreground">
              Students from around the world choose China for their education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                image: "diverse international students at chinese university graduation ceremony",
                caption: "Graduation Day at Tsinghua University",
              },
              {
                image: "international students participating in chinese cultural festival with traditional costumes",
                caption: "Cultural Festival Participation",
              },
              {
                image: "group of international students studying in modern chinese university library",
                caption: "Modern Learning Facilities",
              },
              {
                image: "international students exploring great wall of china during university trip",
                caption: "Cultural Exploration Trips",
              },
            ].map((slide, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="aspect-video">
                  <img
                    src={`/.jpg?height=200&width=300&query=${slide.image}`}
                    alt={slide.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-center">{slide.caption}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 静态学校信息 */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-serif mb-4">Top Universities in China</h2>
            <p className="text-xl text-muted-foreground">
              Explore world-class institutions offering exceptional education opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockSchools.map((school) => (
              <Card key={school.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={school.image || "/placeholder.svg"}
                    alt={`${school.name} campus`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <div className="space-y-2">
                    <h3
                      className="font-semibold font-serif text-lg leading-tight cursor-pointer hover:text-primary transition-colors"
                      onClick={() => handleViewUniversity(school.id)}
                    >
                      {school.name}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {school.location}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">#{school.ranking} QS Ranking</Badge>
                      <div className="flex items-center text-sm">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        {school.rating}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {(school.students / 1000).toFixed(0)}k students
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-3 w-3 mr-1" />
                      {school.internationalStudents}% intl
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {school.subjects.slice(0, 2).map((subject, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {school.subjects.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{school.subjects.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="text-center p-2 bg-muted/30 rounded">
                      <div className="font-semibold text-primary">¥{school.fees.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">per year</div>
                    </div>
                  </div>

                  <Button className="w-full" onClick={() => handleViewUniversity(school.id)}>
                    View University
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <a href="/universities">View All Universities →</a>
            </Button>
          </div>
        </div>
      </section>
      {/* 热门目的地部分 */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-serif text-center">Popular destinations</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Study in Beijing",
                  image: "beijing university campus with traditional chinese architecture",
                  link: "/universities?city=Beijing",
                },
                {
                  name: "Study in Shanghai",
                  image: "shanghai university campus with modern skyline",
                  link: "/universities?city=Shanghai",
                },
                {
                  name: "Study in Guangzhou",
                  image: "guangzhou university campus with subtropical gardens",
                  link: "/universities?city=Guangzhou",
                },
                {
                  name: "Study in Shenzhen",
                  image: "shenzhen university campus with high-tech buildings",
                  link: "/universities?city=Shenzhen",
                },
              ].map((destination, index) => (
                <Card key={index} className="group cursor-pointer hover:shadow-lg transition-all overflow-hidden">
                  <a href={destination.link}>
                    <div className="relative aspect-video">
                      <img
                        src={`/.jpg?height=200&width=300&query=${destination.image}`}
                        alt={destination.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-white font-semibold">{destination.name}</h3>
                      </div>
                    </div>
                  </a>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* 奖学金部分 */}
      <section className="py-16 bg-gradient-to-r from-secondary/10 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-bold font-serif">Discover scholarships</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Explore scholarships and funding opportunities for international students. We've got you covered with
            scholarships from universities and governments worldwide.
          </p>
          <Button size="lg" className="text-lg px-8 py-6" asChild>
            <a href="/scholarships">Find a scholarship →</a>
          </Button>
        </div>
      </section>
      {/* 页脚部分 */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold font-serif mb-4">Study in China</h3>
              <p className="text-sm opacity-80">Your gateway to Chinese education opportunities</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/courses" className="hover:text-primary transition-colors">
                    Courses
                  </a>
                </li>
                <li>
                  <a href="/universities" className="hover:text-primary transition-colors">
                    Universities
                  </a>
                </li>
                <li>
                  <a href="/scholarships" className="hover:text-primary transition-colors">
                    Scholarships
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:text-primary transition-colors">
                    Services
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-primary transition-colors">
                  WeChat
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  Weibo
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-sm opacity-80 mb-4">Get updates on China study opportunities</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 text-foreground rounded-l" />
                <Button className="rounded-l-none">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm opacity-80">
            <p>&copy; 2024 Study in China. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    
  )
}
