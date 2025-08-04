import type { MDXComponents } from 'mdx/types';
import {components} from "../dist/index.js";


export function useMDXComponents(): MDXComponents {
  return components
}