import React from "react";

interface Props {
    top: React.ReactElement;
    left: React.ReactElement;
    middle: React.ReactElement;
    right: React.ReactElement;
}

export const Layout: React.FC<Props> = ({top, left, middle, right}) => {
    return (
        <div>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    color: "#DFDFDF"
                }}
            >
                <div style={{flex: 0, height: 100, zIndex: 100}}>
                    <div
                        style={{
                            backgroundColor: "#DFDFDF",
                            width: "100%",
                            height: "100%",
                            borderRadius: "0px 0px 25px 25px"
                        }}
                    >
                        {top}
                    </div>
                </div>

                <br/>
                <br/>
                <br/>

                <div style={{flex: 1, display: "flex"}}>
                    <div style={{flex: 0, maxWidth: 80, minWidth: 80, zIndex: 100, marginBottom: "130px"}}>
                        <div
                            style={{
                                backgroundColor: "#EFEFEF",
                                width: "100%",
                                height: "100%",
                                borderRadius: "0px 30px 30px 0px",
                                border: `4px solid #4C4C4C`,
                                boxShadow: "rgba(0, 0, 0, 0.4) 0px 5px 10px -10px inset"
                            }}
                        >
                            {left}
                        </div>
                    </div>
                    <div
                        style={{
                            flex: 1
                        }}
                    />
                    <div style={{flex: 0, maxWidth: 80, minWidth: 80, zIndex: 100, marginBottom: "130px"}}>
                        <div
                            style={{
                                backgroundColor: "#EFEFEF",
                                width: "100%",
                                height: "100%",
                                borderRadius: "30px 0px 0px 30px",
                                border: `4px solid #4C4C4C`,
                                boxShadow: "rgba(0, 0, 0, 0.4) 0px 5px 10px -10px inset"
                            }}
                        >
                            {right}
                        </div>
                    </div>
                </div>


            </div>

            <div
                style={{
                    bottom: "0px",
                    left: "80px",
                    right: "80px",
                    top: "24px",
                    position: "fixed",
                    display: "block"
                }}
            >
                <div
                    style={{
                        backgroundColor: "#DFDFDF",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {middle}
                </div>
            </div>
        </div>
    );
};
