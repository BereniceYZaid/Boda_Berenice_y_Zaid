import Slider from "../components/Principal/Slider.jsx";
import Header from "../components/Principal/Header.jsx";
import Footer from "../components/Principal/Footer.jsx";
import ImageGrid from "../components/Principal/ImageGrid.jsx";
import Categories from "../components/Principal/Categories.jsx";
import ImageLoad from "../components/Principal/ImageLoad.jsx";
import Title from "../components/Principal/Title.jsx";
import {fetchImagenes, fetchCategories, fetchUsername} from "../services/fetchers.js";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import React, {useState} from "react";

const PrincipalPage = () => {

    /* UseState */

    const [category, setCategory] = useState("Todos");
    const [sliderImages, setSliderImages] = useState([]);

    /* Fetchers */

    const {
        data: images,
        isLoading: isLoadingImages,
        error: errorImages,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery ({
        queryKey: ["images", category],
        queryFn: ({pageParam = 1}) =>
            fetchImagenes(pageParam, null, category),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.hasMore ? allPages.length + 1 : undefined,
    });

    const {
        data: categories = [],
        isLoading: isLoadingCategories,
        error: errorCategories,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    const {
        data: username = {},
        isLoading: isLoadingUsername,
        error: errorUsername,
    } = useQuery({
        queryKey: ["username"],
        queryFn: fetchUsername,
    });

    /* Transformar datos */

    const allImages = React.useMemo(() => {
        return images?.pages.flatMap((p) => p.items) ?? [];
    }, [images]);

    /* UseEffects */

    React.useEffect(() => {
        if (sliderImages.length === 0 && allImages.length > 0 ){
            setSliderImages(allImages);
            console.log("sliderImages", sliderImages);
        }
    },[allImages, sliderImages]);

    /* Return */

    return <>
        <Header user={username} isLoading={isLoadingUsername}
                error={errorUsername} />
        <Title></Title>
        <Slider images={sliderImages} isLoading={sliderImages.length === 0} error={errorImages} />
        <Categories categories={categories} isLoading={isLoadingCategories}
                    error={errorCategories} category={category}
                    setCategory={setCategory} />
        <ImageGrid images={allImages} category={category} isLoading={isLoadingImages} firstImage={allImages.length === 0} />
        {hasNextPage && (
            <ImageLoad onLoadMore={fetchNextPage} disabled={isFetchingNextPage} />
        )}
        <Footer />
    </>
}

export default PrincipalPage;