import { useState } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Form from "@/components/Form";
import FormRow from "@/components/FormRow";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import Card from "@/components/Card";

import styles from "@/styles/Home.module.scss";

export default function Home() {
  const [attributes, setAttributes] = useState();
  const [image, setImage] = useState();

  const onGenerate = async (e) => {
    e.preventDefault();

    //Clearing state
    setAttributes(undefined);
    setImage(undefined);

    //Calling apis
    const results = await fetch("/api/anime/create").then((r) => r.json());
    setAttributes(results.attributes);

    const { image } = await fetch("/api/anime/image", {
      method: "POST",
      body: JSON.stringify({
        description: results.attributes.description,
      }),
    }).then((r) => r.json());
    setImage(image);
  };
  return (
    <Layout>
      <Head>
        <title>Animé Generator</title>
        <meta name="description" content="Create a new Animé with AI!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section>
        <Container className={styles.cardContainer}>
          <div className={styles.card}>
            <Card attributes={attributes} image={image} />
            <h2>Backstory</h2>
            {attributes?.backstory && <p>{attributes?.backstory}</p>}
          </div>
          <Form className={styles.form}>
            <h2>Create a new Animé!</h2>
            {/* <FormRow>
              <label>Type</label>
              <FormInput name="type" />
            </FormRow> */}
            <FormRow>
              <Button onClick={onGenerate}>Generate</Button>
            </FormRow>
          </Form>
        </Container>
      </Section>
    </Layout>
  );
}
