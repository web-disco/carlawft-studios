const agility = require("./src/agility/utils")

let usingDefaultData = false

exports.sourceNodes = async (args, configOptions) => {
  const {
    actions,
    createNodeId,
    createContentDigest,
    getNode,
    getNodes,
    store,
    cache,
    reporter,
  } = args
  const { createNode, deleteNode, deletePage, touchNode } = actions

  const existingNodes = await getNodes().filter(
    n => n.internal.type.indexOf(`agility`) !== -1
  )

  if (existingNodes.length === 0) {
    console.log("Agility CMS Starter => Creating Default Content")
    usingDefaultData = true
    //create the default agility nodes so that the project can be built with no config
    await createNode({
      id: createNodeId(`sitemap-0-0`),
      parent: null,
      children: [],
      languageCode: "en-us",
      pagePath: "/",
      path: "/",
      menuText: "x",
      pageID: 0,
      internal: {
        type: "agilitySitemapNode",
        content: "",
        contentDigest: "defaultsitemapnode",
      },
    })

    await createNode({
      id: createNodeId(`agilitypage-0-0`),
      parent: null,
      children: [],
      languageCode: "z",
      itemID: 0,
      pageJson: "",
      internal: {
        type: "agilitypage",
        content: "",
        contentDigest: "agilitypage",
      },
    })

    await createNode({
      id: createNodeId(`agilityitem-0-0`),
      parent: null,
      children: [],
      languageCode: "z",
      itemID: 0,
      itemJson: "",
      internal: {
        type: "agilityitem",
        content: "",
        contentDigest: "agilityitem",
      },
    })

    await createNode({
      id: createNodeId(`agilityGlobalHeader-0-0`),
      parent: null,
      children: [],
      languageCode: "en-us",
      itemid: 0,
      contentID: 0,
      customFields: { siteName: "x" },
      properties: { referenceName: "globalheaderx" },
      internal: {
        type: "agilityGlobalHeader",
        content: "",
        contentDigest: "agilityGlobalHeader",
      },
    })

    await createNode({
      id: createNodeId(`agilityPost-0-0`),
      parent: null,
      children: [],
      languageCode: "en-us",
      itemid: 0,
      contentID: 0,
      customFields: {
        title: "",
        details: "",
        image: {
          url: "https://via.placeholder.com/350x150",
          label: "Placeholder",
          width: 350,
          height: 150,
          pixelWidth: 350,
          pixelHeight: 150,
        },
      },
      sitemapNode: {},
      properties: { referenceName: "postsx" },
      internal: {
        type: "agilityPost",
        content: "",
        contentDigest: "agilityPost",
      },
    })
  }
}

exports.createPages = async (args, configOptions) => {
  const {
    graphql,
    actions,
    getNode,
    createNodeId,
    createContentDigest,
    store,
  } = args
  const {
    createPage,
    deletePage,
    createNode,
    createRedirect,
    createPageDependency,
  } = actions

  if (usingDefaultData) {
    createPage({
      path: `/`,
      component: require.resolve(`./src/BlankPage.jsx`),
      context: {},
    })
  }
}

//gatsy-node.js
//CREATE RESOLVERS *******************************************************************************************
exports.createResolvers = args => {
  const {
    createResolvers,
    getNode,
    createNodeId,
    createNode,
    createContentDigest,
    configOptions,
  } = args

  const resolvers = {
    // on the 'agilityService' node type...
    agilityService: {
      sitemapNode: agility.getDynamicPageItemSitemapNode(),
      linkedContent_agilityRates: agility.getLinkedContentList({
        type: "agilityRate",
        linkedContentFieldName: "rates",
      }),
    },

    // on the 'agilityGlobalFooter' node type...
    agilityGlobalFooter: {
      // column 1 links
      linkedContent_column1Links: agility.getLinkedContentList({
        type: "agilityLink",
        linkedContentFieldName: "column1Links",
      }),
      // column 2 links
      linkedContent_column2Links: agility.getLinkedContentList({
        type: "agilityLink",
        linkedContentFieldName: "column2Links",
      }),
      // column 3 links
      linkedContent_column3Links: agility.getLinkedContentList({
        type: "agilityLink",
        linkedContentFieldName: "column3Links",
      }),
    },
  }
  createResolvers(resolvers)
}

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
