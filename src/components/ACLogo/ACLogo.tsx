import ACLogoStyled from './ACLogo.styled';

interface Props extends React.SVGAttributes<SVGSVGElement> {
  style?: React.CSSProperties;
}

const ACLogo = ({ style }: Props) => {
  return (
    <ACLogoStyled
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 1250 1250"
      style={style}
    >
      <defs>
        <clipPath id="hl-mask">
          <circle cx="625" cy="625" r="620"></circle>
        </clipPath>

        <circle className="hl0" cx="625" cy="625" r="620" id="hl-bg"></circle>
      </defs>
      <use href="#hl-bg"></use>
      <g className="header-logo__shape">
        <use href="#hl-bg"></use>
        <path
          className="hl1"
          d="M712.6,275L1059,475L799.2,625l-86.6-50L712.6,275L712.6,275z M539.4,575V475L279.6,625l86.6,50L539.4,575zM539.4,375V275L193,475l86.6,50L539.4,375z M626,1125l433-250L626,625L193,875L626,1125z"
        ></path>
        <path
          className="hl2"
          d="M712.6,275v300L1059,775v100L626,625V125l433,250v100L712.6,275z M279.6,625v100l86.6-50L279.6,625z"
        ></path>
        <path
          className="hl3"
          d="M193,575v300l433-250V125L193,375v100l346.4-200v100L193,575z M279.6,725V625l259.8-150v100L279.6,725z"
        ></path>
        <path
          className="hl4"
          d="M193,875l433-250l433,250 M626,625V125 M279.6,725l259.8-150V475L279.6,625V725z M366.2,675l-86.6-50 M193,475l346.4-200v100L193,575v300l433,250l433-250V775L799.2,625l-86.6-50V275L1059,475 M799.2,625L1059,475V375L626,125L193,375v100l86.6,50"
        ></path>
      </g>
      <use href="#hl-bg" className="header-logo__hitarea" fillOpacity="0"></use>
    </ACLogoStyled>
  );
};

export default ACLogo;
