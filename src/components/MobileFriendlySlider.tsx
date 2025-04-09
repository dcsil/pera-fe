import { Slider, sliderClasses, styled } from "@mui/joy";

/**
 * Slider that keeps labels within edges.
 *
 * https://mui.com/joy-ui/react-slider/#keep-the-label-at-edges
 */
const MobileFriendlySlider = styled(Slider)(() => ({
    [`& [style*="left:0%"], & [style*="left: 0%"]`]: {
        [`&.${sliderClasses.markLabel}`]: {
            transform: "none",
        },
        [`& .${sliderClasses.valueLabel}`]: {
            "left": "calc(var(--Slider-thumbSize) / 2)",
            "borderBottomLeftRadius": 0,
            "&::before": {
                left: 0,
                transform: "translateY(100%)",
                borderLeftColor: "currentColor",
            },
        },
    },
    [`& [style*="left:100%"], & [style*="left: 100%"]`]: {
        [`&.${sliderClasses.markLabel}`]: {
            transform: "translateX(-100%)",
        },
        [`& .${sliderClasses.valueLabel}`]: {
            "right": "calc(var(--Slider-thumbSize) / 2)",
            "borderBottomRightRadius": 0,
            "&::before": {
                left: "initial",
                right: 0,
                transform: "translateY(100%)",
                borderRightColor: "currentColor",
            },
        },
    },
}));

export default MobileFriendlySlider;
