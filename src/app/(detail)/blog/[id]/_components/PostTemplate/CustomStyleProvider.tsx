import React, { PropsWithChildren } from 'react'

import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import * as style from './customStyleProvider.css'
const CustomStyleProvider = ({ children }: PropsWithChildren) => {
  return <div className={style.base}>{children}</div>
}

export default CustomStyleProvider
