import React from 'react'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode
}

const CardListFrame = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>
}

export default CardListFrame

const Wrapper = styled.div`
  display: grid;
  gap: 35px;
  margin-top: 40px;
`