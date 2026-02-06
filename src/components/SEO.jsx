import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import api from '../api/api';

const SEO = ({ pageName, fallbackTitle, fallbackDesc, image, type = 'website', manualTitle, manualDesc, manualKeywords }) => {
    const [seo, setSeo] = useState(null);
    const [favicon, setFavicon] = useState('/logo/fabicon.png');
    const location = useLocation();
    const domain = 'https://printlast.shop'; // Default production domain
    
    // Reactive current URL
    const currentUrl = useMemo(() => {
        return `${domain}${location.pathname}${location.search}`;
    }, [location]);

    // Reset SEO state when page changes to ensure fresh fetch/render
    useEffect(() => {
        setSeo(null);
    }, [pageName]);

    useEffect(() => {
        let isMounted = true;
        
        // If manual overrides are provided, we don't need to fetch from API
        // But we still fetch branding for the favicon if needed
        if (manualTitle || manualDesc) {
            const websiteId = import.meta.env.VITE_WEBSITE_ID || 1;
            api.get(`/websites/${websiteId}`).then(res => {
                if (isMounted && res.data?.favicon_url) {
                    setFavicon(res.data.favicon_url);
                }
            }).catch(err => console.error("Branding Load Error:", err));
            return;
        }

        const fetchSEO = async () => {
            const websiteId = import.meta.env.VITE_WEBSITE_ID || 1;
            try {
                // Fetch separately to avoid one failing the other
                if (pageName) {
                    api.get(`/seo/${pageName}`, { params: { website_id: websiteId } }).then(res => {
                        if (isMounted && res.data) {
                            setSeo(res.data);
                        }
                    }).catch(err => console.error("SEO Load Error:", err));
                }

                api.get(`/websites/${websiteId}`).then(res => {
                    if (isMounted && res.data?.favicon_url) {
                        setFavicon(res.data.favicon_url);
                    }
                }).catch(err => console.error("Branding Load Error:", err));

            } catch (error) {
                if (isMounted) {
                     // Fallback is handled in render, but we can set state to confirm loaded
                     setSeo({}); 
                }
            }
        };

        fetchSEO();
        
        return () => { isMounted = false; };
    }, [pageName, manualTitle, manualDesc, manualKeywords]);

    useEffect(() => {
        if (favicon) {
            const link = document.querySelector("link[rel~='icon']");
            if (link) {
                link.href = favicon;
            } else {
                const newLink = document.createElement('link');
                newLink.rel = 'icon';
                newLink.href = favicon;
                document.head.appendChild(newLink);
            }
        }
    }, [favicon]);

    const title = manualTitle || seo?.meta_title || fallbackTitle || 'printlast';
    const description = manualDesc || seo?.meta_description || fallbackDesc || '';
    const keywords = manualKeywords || seo?.meta_keywords || '';
    const metaImage = image || `${domain}/logo/logo.jpg`;

    // Manual fallback for document title to ensure it updates during navigation
    useEffect(() => {
        if (title) {
            const timeoutId = setTimeout(() => {
                document.title = title;
            }, 0);
            return () => clearTimeout(timeoutId);
        }
    }, [title]);

    return (
        <Helmet defer={false} key={currentUrl}>
            {/* Standard Metadata */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={currentUrl} />
            <link rel="icon" type="image/png" href={favicon} />

            {/* Open Graph / Facebook */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content="printlast" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={metaImage} />
        </Helmet>
    );
};

export default SEO;