<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Forms

Always use **React Hook Form** + **Zod** for every form:

- Define schemas with Zod (prefer shared schemas in `src/lib/` when reusable).
- Wire forms with `useForm` and `zodResolver` from `@hookform/resolvers/zod`.
- Use `register` for native inputs and `Controller` for custom inputs (e.g. OTP).
- Do not use uncontrolled `onSubmit` + manual state validation for form fields.
