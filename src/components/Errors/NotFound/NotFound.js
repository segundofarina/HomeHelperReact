import React from 'react'
import GenericError from '../GenericError/GenericError'

const notFound = () => (
    <GenericError number='404' description='Not Found' />
)

export default notFound