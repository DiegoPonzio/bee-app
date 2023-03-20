import React from "react"

const useAdminItem = React.createContext(false)
const useEditPost = React.createContext(false)
const useComment = React.createContext(false)
const useFile = React.createContext(false)

export {useAdminItem, useEditPost, useComment, useFile}