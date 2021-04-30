import { useState } from 'react'
import create from 'zusteller'
const useStore = create(() => useState(false))
export default useStore