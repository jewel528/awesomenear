import React from 'react'
import Markdown from 'react-markdown'
import { graphql } from 'gatsby'
import { RepositoryType } from '../data/github'
import Header from '../components/header'
import SEO from '../components/seo'
import Gitpod from './gitpod'
import GitHub from './github'

// bypass typescript by using commonjs syntax:
// https://github.com/microsoft/TypeScript-React-Starter/issues/12
const defaultBanner = require('../images/default-banner.svg')
const styles = require('./repository.module.css')

type Props = {
  data: {
    github: {
      repo: RepositoryType
    }
  }
}

const Repository = ({ data }: Props) => {
  const { repo } = data.github
  const title = repo.readme.text.split('\n')[0]
  const readme = repo.readme.text.replace(/[\s\S]*<!-- [^>]+ -->/, '')
  return (
    <>
      <SEO title={title} />
      <Header>
        <div style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <h1>{title}</h1>
        </div>
      </Header>
      <div style={{
        margin: '0 auto',
        maxWidth: '45em'
      }}>
        <img
          alt=""
          src={repo.usesCustomOpenGraphImage
            ? repo.openGraphImageUrl
            : defaultBanner
          }
        />
        <p style={{
          display: 'grid',
          gridGap: '1.5em',
          gridTemplateColumns: 'repeat(auto-fit, minmax(17em, 1fr))',
          alignItems: 'center',
          margin: '1.5em 0'
        }}>
          <a className={styles.button} href={`https://gitpod.io/#${repo.url}`}>
            <span>Open in</span>
            <Gitpod />
          </a>
          <a className={styles.button} href={repo.url}>
            <span>Browse on</span>
            <GitHub />
          </a>
        </p>
        <Markdown source={readme} />
      </div>
    </>
  )
}

export default Repository

export const query = graphql`
  query($name: String!) {
    github {
      repo: repository(name: $name, owner: "near-examples") {
        id
        name
        description
        url
        isPrivate
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
`
