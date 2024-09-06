import * as React from 'react';
import { SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={20} fill="none" {...props}>
    <path
      fill="url(#a)"
      d="M9.71 5.59 11 4.507v9.658a.77.77 0 0 0 .293.59c.187.155.442.243.707.243.265 0 .52-.087.707-.244a.77.77 0 0 0 .293-.589V4.507l1.29 1.083c.093.078.204.14.325.182a1.176 1.176 0 0 0 .77 0c.121-.042.232-.104.325-.182a.844.844 0 0 0 .219-.271.714.714 0 0 0 0-.641.843.843 0 0 0-.219-.271l-3-2.5a1.032 1.032 0 0 0-.325-.183 1.176 1.176 0 0 0-.77 0 1.032 1.032 0 0 0-.325.183l-3 2.5a.773.773 0 0 0-.294.591c0 .222.106.435.294.592.188.157.444.245.71.245.266 0 .522-.088.71-.245ZM18 7.498h-2c-.265 0-.52.088-.707.244a.77.77 0 0 0-.293.59.77.77 0 0 0 .293.589c.187.156.442.244.707.244h2c.265 0 .52.088.707.244A.77.77 0 0 1 19 10v5.833a.77.77 0 0 1-.293.589 1.11 1.11 0 0 1-.707.244H6a1.11 1.11 0 0 1-.707-.244.77.77 0 0 1-.293-.59V9.999a.77.77 0 0 1 .293-.589A1.11 1.11 0 0 1 6 9.165h2c.265 0 .52-.088.707-.244A.77.77 0 0 0 9 8.33a.77.77 0 0 0-.293-.589A1.11 1.11 0 0 0 8 7.498H6c-.796 0-1.559.264-2.121.733C3.316 8.699 3 9.335 3 9.998v5.834c0 .663.316 1.299.879 1.767.562.47 1.325.733 2.121.733h12c.796 0 1.559-.264 2.121-.733.563-.468.879-1.104.879-1.767V9.998c0-.663-.316-1.299-.879-1.767-.562-.47-1.325-.733-2.121-.733Z"
    />
    <defs>
      <linearGradient id="a" x1={3} x2={19.61} y1={9.996} y2={9.971} gradientUnits="userSpaceOnUse">
        <stop stopColor="#60088C" />
        <stop offset={1} stopColor="#A11E90" />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgComponent;
