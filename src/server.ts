import { PrismaClient } from "@prisma/client"
import fastify from "fastify"
import { z } from "zod"
import { readFileSync } from "node:fs"

const app = fastify()
const prisma = new PrismaClient()

app.register(require('@fastify/multipart'))

app.get('/api/cliente', async() =>{
    const clientes = await prisma.cliente_contato.findMany()
    return {clientes}
})

app.post('/api/cliente', async(request, reply) =>{
    return reply.status(201).send()
    const createUserSchema = z.object({
        nome: z.string(),
        telefone: z.string(),
        email: z.string(),
        observacoes: z.string()
    })
    const {nome, telefone, email, observacoes} = createUserSchema.parse(request.body)

    await prisma.cliente_contato.create({
        data: {
            nome, telefone, email, observacoes
        }
    })
    return reply.status(201).send()
})

app.get('/candidato', async (req, res)=>{
    const stream = await readFileSync(__dirname+'/../pages/cadastro_candidato.html')
    res.type('text/html').send(stream)
})

app.get('/api/candidato', async() =>{
    const candidato = await prisma.candidato.findMany()
    return {candidato}
})

app.post('/api/candidato', async(request, reply) =>{
    const createCandidatoSchema = z.object({
        nome: z.string(),
        telefone: z.string(),
        email: z.string(),
        observacoes: z.string()
    })
    
    const {nome, telefone, email, observacoes} = createCandidatoSchema.parse(request.body)

    await prisma.candidato.create({
        data: {
            nome, telefone, email, observacoes
        }
    })
    return reply.status(201).send()
})

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(()=>{
    console.log("HTTP Server Running")
})

/**
 * https://stackblitz.com/edit/github-x5a9mx-z5c3dp?file=components%2FContactForm.tsx
 * const formSchema = z.object({
    firstName: z.string().min(1, 'First name is required').trim(),
    lastName: z.string().min(1, 'Last name is required').trim(),
    file: z
      .any()
      .refine((file) => file?.length == 1, 'File is required.')
      .refine((file) => file[0]?.type === 'application/pdf', 'Must be a PDF.')
      .refine((file) => file[0]?.size <= 3000000, `Max file size is 3MB.`),
  });
 */