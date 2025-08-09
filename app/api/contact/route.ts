import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Types for the request body
interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// Create reusable transporter with connection pooling (faster subsequent emails)
let transporter: nodemailer.Transporter | null = null

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // Use STARTTLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
      pool: true, // Use connection pooling
      maxConnections: 5, // Maximum concurrent connections
      maxMessages: 100, // Maximum messages per connection
      rateDelta: 1000, // Rate limiting: 1 second between messages
      rateLimit: 5, // Maximum 5 messages per rateDelta
    })
  }
  return transporter
}

// Validation function
function validateFormData(data: ContactFormData): string[] {
  const errors: string[] = []

  // Name validation
  if (!data.name?.trim()) {
    errors.push('Name is required')
  } else if (data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters')
  } else if (!/^[a-zA-Z\s'-]+$/.test(data.name.trim())) {
    errors.push('Name can only contain letters, spaces, hyphens, and apostrophes')
  } else if (/^[^a-zA-Z]*$/.test(data.name.trim())) {
    errors.push('Name must contain at least some letters')
  } else if (data.name.trim().length > 50) {
    errors.push('Name cannot exceed 50 characters')
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email?.trim()) {
    errors.push('Email is required')
  } else if (!emailRegex.test(data.email)) {
    errors.push('Please enter a valid email')
  } else if (data.email.length > 100) {
    errors.push('Email cannot exceed 100 characters')
  }

  // Subject validation
  if (!data.subject?.trim()) {
    errors.push('Subject is required')
  } else if (data.subject.trim().length < 3) {
    errors.push('Subject must be at least 3 characters')
  } else if (!/[a-zA-Z]/.test(data.subject.trim())) {
    errors.push('Subject must contain at least some letters')
  } else if (/^[!@#$%^&*()_+=\-[\]{}|\\:";'<>?,.\/~`]*$/.test(data.subject.trim())) {
    errors.push('Subject cannot contain only special characters')
  } else if (data.subject.trim().length > 100) {
    errors.push('Subject cannot exceed 100 characters')
  }

  // Message validation
  if (!data.message?.trim()) {
    errors.push('Message is required')
  } else if (data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters')
  } else if (!/[a-zA-Z]/.test(data.message.trim())) {
    errors.push('Message must contain at least some letters')
  } else if (/^[!@#$%^&*()_+=\-[\]{}|\\:";'<>?,.\/~`\s]*$/.test(data.message.trim())) {
    errors.push('Message cannot contain only special characters or spaces')
  } else if (data.message.trim().length > 1000) {
    errors.push('Message cannot exceed 1000 characters')
  } else {
    // Check for meaningful content (not just repeated characters)
    const uniqueChars = new Set(data.message.trim().toLowerCase().replace(/\s/g, '')).size
    if (uniqueChars < 3) {
      errors.push('Message should contain more varied content')
    }
  }

  return errors
}

// Background email sending function
async function sendEmailAsync(emailData: ContactFormData) {
  try {
    console.log('Starting email send process for:', emailData.email)
    const transporter = getTransporter()
    
    // Test connection first
    console.log('Testing SMTP connection...')
    await transporter.verify()
    console.log('SMTP connection verified')
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'andreiartap@gmail.com',
      subject: `Portfolio Contact: ${emailData.subject}`,
      text: `
Name: ${emailData.name}
Email: ${emailData.email}
Subject: ${emailData.subject}

Message:
${emailData.message}

---
Sent from your portfolio contact form
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px; margin-bottom: 20px;">
              New Portfolio Contact Form Submission
            </h2>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #4F46E5;">Name:</strong>
              <p style="margin: 5px 0 15px 0; color: #333;">${emailData.name}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #4F46E5;">Email:</strong>
              <p style="margin: 5px 0 15px 0; color: #333;">
                <a href="mailto:${emailData.email}" style="color: #4F46E5; text-decoration: none;">${emailData.email}</a>
              </p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #4F46E5;">Subject:</strong>
              <p style="margin: 5px 0 15px 0; color: #333;">${emailData.subject}</p>
            </div>
            
            <div style="margin-bottom: 30px;">
              <strong style="color: #4F46E5;">Message:</strong>
              <div style="margin: 10px 0; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #4F46E5; border-radius: 4px;">
                <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${emailData.message}</p>
              </div>
            </div>
            
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                Sent from your portfolio contact form • ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      `,
      replyTo: emailData.email,
    }

    console.log('Sending email...')
    const result = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully!')
    console.log('Send result:', result.messageId)
    
  } catch (error) {
    console.error('Failed to send email:', error)
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        code: (error as any).code,
        response: (error as any).response
      })
    }
    // In production, you might want to implement retry logic or queue system here
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Parse the request body
    const body: ContactFormData = await request.json()

    // Validate the form data (fast validation)
    const validationErrors = validateFormData(body)
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      )
    }

    // Quick environment check
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing email configuration environment variables')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // PERFORMANCE BOOST: Send email in background (don't wait)
    // This makes the API response almost instant while email sends separately
    setImmediate(() => {
      sendEmailAsync(body)
    })

    const responseTime = Date.now() - startTime
    console.log(`API Response time: ${responseTime}ms (email sending in background)`)

    // Return success immediately (email is being sent in background)
    return NextResponse.json(
      { 
        message: 'Message received successfully',
        status: 'sending',
        responseTime: `${responseTime}ms`
      },
      { status: 200 }
    )

  } catch (error) {
    const responseTime = Date.now() - startTime
    console.error(`Error processing request (${responseTime}ms):`, error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}