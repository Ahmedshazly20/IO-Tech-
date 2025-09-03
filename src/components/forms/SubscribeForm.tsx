"use client";
import { Formik, Form, Field } from "formik";

export default function SubscribeForm() {
    return (
        <Formik initialValues={{ email: "" }} onSubmit={() => {}}>
            {() => (
                <Form className="flex gap-2">
                    <Field name="email" type="email" placeholder="Email" className="border rounded px-3 py-2" />
                    <button type="submit" className="px-4 py-2 rounded bg-black text-white">Subscribe</button>
                </Form>
            )}
        </Formik>
    );
}
