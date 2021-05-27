import React from "react"
import { graphql } from "gatsby"
import agilityUtils from "./agility/utils"
import AgilityPageTemplate from "./agility/components/AgilityPageTemplate"
//Some things we need for our layout
import Layout from "./components/Layout"
import PreviewBar from "./components/PreviewBar"
import GlobalHeader from "./components/GlobalHeader"
import GlobalFooter from "./components/GlobalFooter"
import SEO from "./components/SEO"

//Our query to get the our page data and check for a dynamic page item (agilityItem)
export const query = graphql`
  query($pageID: Int!, $contentID: Int!, $languageCode: String!) {
    agilitypage(languageCode: { eq: $languageCode }, itemID: { eq: $pageID }) {
      pageJson
    }
    agilityitem(
      languageCode: { eq: $languageCode }
      itemID: { eq: $contentID }
    ) {
      itemJson
    }
  }
`
const AgilityPage = ({ pageContext, data }) => {
  const viewModel = agilityUtils.buildPageViewModel({ pageContext, data })
  return (
    <Layout test={true}>
      <SEO
        title={viewModel.page.title}
        description={viewModel.page.seo.metaDescription}
        keywords={viewModel.page.seo.metaKeywords}
        ogImage={
          viewModel.dynamicPageItem?.customFields?.image?.url ||
          "set default image here"
        }
      />
      <PreviewBar isPreview={viewModel.isPreview} />
      <div className="flex flex-col min-h-screen">
        <GlobalHeader
          languageCode={viewModel.languageCode}
          isMultiLanguage={viewModel.isMultiLanguage}
        />
        <main className="flex-grow container mx-auto px-4">
          <AgilityPageTemplate {...viewModel} />
        </main>
        <GlobalFooter />
      </div>
    </Layout>
  )
}

export default AgilityPage
