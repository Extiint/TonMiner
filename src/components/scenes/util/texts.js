export default function createText(scene, x, y, text, styleOverrides = {}) {
    const baseStyle = {
        fontFamily: 'Inter',
        fontSize: '13px',
        fontStyle: 'bold', // Adds bold font style
        color: '#ffffff',
        align: 'center',
        shadow: {
            offsetX: 2,
            offsetY: 2, 
            color: '#000', 
            blur: 0,
            stroke: true, 
            fill: true 
        }
    };
    

    // Merge base style with any style overrides provided
    const style = { ...baseStyle, ...styleOverrides };

    return scene.add.text(x, y, text, style);
}
