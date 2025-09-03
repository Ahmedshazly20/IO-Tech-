"use client";
import { Formik, Form, Field } from "formik";

export default function ContactForm() {
    return (
        <Formik initialValues={{ name: "", email: "", message: "" }} onSubmit={() => {}}>
            {() => (
                <Form className="grid gap-2">
                    <Field name="name" placeholder="Name" className="border rounded px-3 py-2" />
                    <Field name="email" type="email" placeholder="Email" className="border rounded px-3 py-2" />
                    <Field as="textarea" name="message" placeholder="Message" className="border rounded px-3 py-2" />
                    <button type="submit" className="px-4 py-2 rounded bg-black text-white">Send</button>
                </Form>
            )}
        </Formik>
    );
}
