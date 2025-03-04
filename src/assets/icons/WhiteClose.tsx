import * as React from 'react';
import { SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <div className="scale-[70%] cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
      <path
        fill="white"
        d="m13.41 12 6.3-6.29a1.004 1.004 0 0 0-1.42-1.42L12 10.59l-6.29-6.3a1.004 1.004 0 1 0-1.42 1.42l6.3 6.29-6.3 6.29a.999.999 0 0 0 0 1.42 1 1 0 0 0 1.42 0l6.29-6.3 6.29 6.3a1.001 1.001 0 0 0 1.639-.325 1 1 0 0 0-.22-1.095L13.41 12Z"
      />
    </svg>
  </div>
);
export default SvgComponent;
