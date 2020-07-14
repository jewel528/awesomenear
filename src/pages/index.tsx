import React from 'react'
import { graphql } from 'gatsby'
import Grid from '../components/grid'
import SEO from '../components/seo'
import Header from '../components/header'
import Footer from '../components/footer'
import Container from '../components/container'
import { extractRepositories, QueryData } from '../data/github'

const App = (props: { data: QueryData }) => (
  <>
    <SEO />
    <div style={{ minHeight: '100vh' }}>
      <Header>
        <h1 style={{ marginBottom: 0 }}>Examples</h1>
        <p style={{ marginTop: 0 }}>
          Wondering what you can build with <a href="https://nearprotocol.com/">NEAR</a>? Check out these examples for inspiration! You can also <a href="https://github.com/near-examples">view these examples on GitHub</a>.
        </p>
      </Header>
      <Container>
        <Grid repositories={extractRepositories(props.data)} />
      </Container>
    </div>
    <Footer />
  </>
)

export default App

export const query = graphql`
  query {
    github {
      search(type: REPOSITORY, first: 20, query: "org:near-examples topic:ready-to-use") {
        repositoryCount
        pageInfo {
          hasNextPage
          endCursor
        }
        repositories: nodes {
          ... on GitHub_Repository {
            id
            name
            description
            url
            openGraphImageUrl
            usesCustomOpenGraphImage
            readme: object(expression: "master:README.md") {
              ... on GitHub_Blob {
                text
              }
            }
            repositoryTopics(first: 10) {
              nodes {
                id
                url
                topic {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`
