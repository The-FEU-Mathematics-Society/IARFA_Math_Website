import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function HeroPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">FEU Math Organization</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to FEU Math Org</h2>
          <p className="text-xl mb-6">Empowering students through the beauty of mathematics</p>
          <Button asChild size="lg">
            <Link href="/math-lessons">
              Explore Math Lessons
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Creator</h2>
          <Card>
            <CardContent className="flex items-center p-6">
              <Avatar className="h-24 w-24 mr-6">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Creator" />
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-semibold">John Doe</h3>
                <p className="text-muted-foreground">Founder of FEU Math Organization</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Officers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['President', 'Vice President', 'Secretary', 'Treasurer', 'PR Officer', 'Event Coordinator'].map((role, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{role}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center">
                  <Avatar className="h-16 w-16 mr-4">
                    <AvatarImage src={`/placeholder.svg?height=64&width=64&text=${role[0]}`} alt={role} />
                    <AvatarFallback>{role[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Officer Name</h3>
                    <p className="text-sm text-muted-foreground">{role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Rationale</h2>
          <Card>
            <CardContent className="p-6">
              <p>
                The FEU Math Organization was founded with the vision of fostering a deep appreciation for mathematics among students. 
                We believe that mathematics is not just a subject, but a powerful tool for problem-solving and critical thinking. 
                Our mission is to create a supportive community where students can explore the beauty of mathematics, collaborate on 
                challenging problems, and develop skills that will serve them in their academic and professional lives.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Mail className="mr-2" />
                <span>contact@feumath.org</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2" />
                <span>+1 (123) 456-7890</span>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-4 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} FEU Math Organization. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}