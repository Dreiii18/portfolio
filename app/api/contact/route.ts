import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Types for the request body
interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

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
    console.log('Sending email with Resend...')
    
    const result = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'andreiartap@gmail.com',
      subject: `Portfolio Contact: ${emailData.subject}`,
      replyTo: emailData.email,
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
              <p style="margin: 5px 0 15px 0; color: #333;">${emailData.email}</p>
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
    })
    
    console.log('Email sent successfully with Resend!')
    console.log('Send result:', result.data?.id)
    
  } catch (error) {
    console.error('Failed to send email with Resend:', error)
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        name: error.name
      })
    }
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
    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY environment variable')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Send email in background (don't wait)
    sendEmailAsync(body).catch(error => {
      console.error('Background email sending failed:', error)
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