import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./GroupComponent.module.css";

export type GroupComponentType = {
  className?: string;
  prop?: string;
  prop1?: string;

  /** Style props */
  groupDivAlignSelf?: CSSProperties["alignSelf"];
  groupDivWidth?: CSSProperties["width"];
  divDisplay?: CSSProperties["display"];
  divMinWidth?: CSSProperties["minWidth"];
};

const GroupComponent: FunctionComponent<GroupComponentType> = ({
  className = "",
  prop,
  prop1,
  groupDivAlignSelf,
  groupDivWidth,
  divDisplay,
  divMinWidth,
}) => {
  const groupDivStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: groupDivAlignSelf,
    };
  }, [groupDivAlignSelf]);

  const groupDiv1Style: CSSProperties = useMemo(() => {
    return {
      width: groupDivWidth,
    };
  }, [groupDivWidth]);

  const divStyle: CSSProperties = useMemo(() => {
    return {
      display: divDisplay,
      minWidth: divMinWidth,
    };
  }, [divDisplay, divMinWidth]);

  return (
    <div
      className={[styles.rectangleParent, className].join(" ")}
      style={groupDivStyle}
    >
      <div className={styles.frameChild} />
      <h2 className={styles.h2}>{prop}</h2>
      <div className={styles.rectangleGroup} style={groupDiv1Style}>
        <div className={styles.frameItem} />
        <div className={styles.div} style={divStyle}>
          {prop1}
        </div>
      </div>
    </div>
  );
};

export default GroupComponent;
