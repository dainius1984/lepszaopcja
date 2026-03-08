import { Helmet } from "react-helmet-async";

/**
 * Injects JSON-LD structured data into the document head.
 * @param {object|object[]} schema - Single Schema.org object or array of schemas (each with @context)
 */
export default function JsonLd({ schema }) {
  const data = Array.isArray(schema) ? schema : [schema];
  return (
    <Helmet>
      {data.map((script, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(script)}
        </script>
      ))}
    </Helmet>
  );
}
