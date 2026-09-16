const fs = require('fs');
const path = require('path');

function convertHtmlToJsx(html) {
    let jsx = html;
    
    // Convert class to className
    jsx = jsx.replace(/class="/g, 'className="');
    
    // Convert for to htmlFor
    jsx = jsx.replace(/for="/g, 'htmlFor="');
    
    // Remove onclick
    jsx = jsx.replace(/onclick="[^"]*"/g, '');
    jsx = jsx.replace(/onkeyup="[^"]*"/g, '');
    
    // Self close tags
    jsx = jsx.replace(/<img([^>]*[^\/])>/g, '<img$1 />');
    jsx = jsx.replace(/<input([^>]*[^\/])>/g, '<input$1 />');
    jsx = jsx.replace(/<br([^>]*[^\/])>/g, '<br$1 />');
    jsx = jsx.replace(/<hr([^>]*[^\/])>/g, '<hr$1 />');
    
    // Replace inline styles if any (simple hack for font-variation-settings)
    jsx = jsx.replace(/style="[^"]*"/g, (match) => {
        // Just remove complex styles for now to avoid JSX object mapping issues,
        // or specifically map font-variation-settings
        if (match.includes("font-variation-settings")) {
            return `style={{ fontVariationSettings: "'FILL' 1" }}`;
        }
        return '';
    });

    // Handle HTML comments inside JSX
    jsx = jsx.replace(/<!--(.*?)-->/gs, '{/* $1 */}');
    
    // Return inner body
    const bodyMatch = jsx.match(/<body[^>]*>([\s\S]*?)<\/body>/);
    if (bodyMatch) {
        return `<>\n${bodyMatch[1]}\n</>`;
    }
    
    return jsx;
}

const basePath = 'C:\\Users\\Pc\\OneDrive\\Desktop\\Automation\\stitch_modern_minimal_saas_dashboard';

const files = [
    { name: 'Dashboard', path: 'owner_dashboard_rebook/code.html' },
    { name: 'Services', path: 'manage_services_rebook/code.html' },
    { name: 'BookingPage', path: 'customer_booking_page_aura_wellness_studio/code.html' }
];

files.forEach(file => {
    const fullPath = path.join(basePath, file.path);
    const html = fs.readFileSync(fullPath, 'utf8');
    const jsx = convertHtmlToJsx(html);
    fs.writeFileSync(`C:\\Users\\Pc\\OneDrive\\Desktop\\Automation\\rebook-app\\src\\${file.name}Raw.jsx`, jsx);
});
console.log("Conversion complete");
