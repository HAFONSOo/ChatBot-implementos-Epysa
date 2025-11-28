import React, { useState, useRef } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import "./Styles/Body.css";

/* =========================
   Utilidades
========================= */
/**
 * CLP: Utilidad para formatear números a pesos chilenos (CLP) sin decimales.
 */
const CLP = (n) =>
  n.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

/* =========================
   Tarjeta de producto
========================= */
/**
 * ProductCard: Componente que representa una tarjeta de producto con imagen,
 * marca, nombre y precio. Incluye botón para agregar al carrito (sin lógica)
 */
function ProductCard({ image, brand, name, price, iva = true }) {
  return (
    <div className="card">
      <div className="card-img">
        <img src={image} alt={name} />
      </div>
      <div className="card-meta">
        <div className="brand">{brand}</div>
        <div className="name">{name}</div>
        <div className="price">
          {CLP(price)} <span className="iva">{iva ? "c/IVA" : ""}</span>
        </div>
      </div>
      <button className="btn-primary">AGREGAR</button>
    </div>
  );
}

/* =========================
   Vitrina con tabs
========================= */
/**
 * TabbedShelf: Vitrina con tabs que permite cambiar entre secciones de productos.
 * - titleTabs: array con títulos de cada pestaña
 * - sections: datos (hero, products, banner) para cada pestaña
 */
function TabbedShelf({ titleTabs = [], sections }) {
  const [tab, setTab] = useState(0);
  const data = sections[tab];

  return (
    <section className="shelf">
      {/* Tabs */}
      <div className="tabs">
        {titleTabs.map((t, i) => (
          <button
            key={t}
            className={`tab ${i === tab ? "active" : ""}`}
            onClick={() => setTab(i)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grid principal */}
      <div className="shelf-grid">
        <figure className="hero">
          <img src={data.hero} alt="hero" />
        </figure>

        <div className="cards">
          {data.products.slice(0, 2).map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>

        <div className="cards">
          {data.products.slice(2, 4).map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>

      {/* Banner inferior opcional */}
      {data.banner && (
        <div className="promo-strip">
          <img src={data.banner.src} alt={data.banner.alt || "promo"} />
          {data.banner.cta && (
            <a className="promo-cta" href="#">
              {data.banner.cta}
            </a>
          )}
        </div>
      )}
    </section>
  );
}

/* =========================
   Grid categorías (No te lo puedes perder)
========================= */
/**
 * CategoryGrid: Renderiza una cuadrícula de categorías con imágenes y texto.
 */
function CategoryGrid({ title, subtitle, items }) {
  return (
    <section className="cat-grid">
      <h3 className="sec-title">{title}</h3>
      <p className="sec-subtitle">{subtitle}</p>

      <div className="grid">
        {items.map((it, i) => (
          <a key={i} href="#" className={`tile size-${it.size || "m"}`}>
            <img src={it.image} alt={it.text} />
            <span className="tile-text">{it.text}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* =========================
   Carrusel de recomendados
========================= */
/**
 * RecsCarousel: Carrusel horizontal de recomendaciones con navegación
 * (se desplaza por la lista usando scroll suave).
 */
function RecsCarousel({ title, subtitle, products }) {
  const ref = useRef(null);
  /** scrollBy: desplaza el rail de recomendaciones en px (positivo o negativo) */
  const scrollBy = (px) =>
    ref.current && ref.current.scrollBy({ left: px, behavior: "smooth" });

  return (
    <section className="recs">
      <h3 className="sec-title">{title}</h3>
      <p className="sec-subtitle">{subtitle}</p>

      <div className="recs-rail-wrap">
        <button
          className="rail-nav left"
          onClick={() => scrollBy(-600)}
          aria-label="prev"
        >
          <RiArrowLeftSLine />
        </button>
        <div className="recs-rail" ref={ref}>
          {products.map((p) => (
            <div className="recs-item" key={p.id}>
              <ProductCard {...p} />
            </div>
          ))}
        </div>
        <button
          className="rail-nav right"
          onClick={() => scrollBy(600)}
          aria-label="next"
        >
          <RiArrowRightSLine />
        </button>
      </div>
    </section>
  );
}

/* =========================
   Blog + Marcas
========================= */
/**
 * BlogBlock: Bloque que muestra una imagen y una lista de posts del blog con CTA.
 */
function BlogBlock({ image, posts }) {
  return (
    <section className="blog">
      <div className="blog-grid">
        <figure className="blog-img">
          <img src={image} alt="blog" />
        </figure>
        <div className="blog-list">
          <h3 className="blog-title">IMPLEBLOG</h3>
          <p className="blog-subtitle">El Blog del transportista</p>

          <ul>
            {posts.map((p, i) => (
              <li key={i} className="blog-item">
                <a href="#">
                  <span className="blog-item-title">
                    {i + 1}. {p.title}
                  </span>
                  {p.desc && (
                    <span className="blog-item-desc">{p.desc}</span>
                  )}
                </a>
                {p.cta && <button className="btn-outline">{p.cta}</button>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * BrandsBlock: Muestra el carrusel o grid de logos de marcas y características
 * relevantes de la tienda.
 */
function BrandsBlock({ logos, features }) {
  return (
    <section className="brands">
      <h3 className="sec-title">Nuestras Marcas</h3>

      <div className="logo-row">
        {logos.map((src, i) => (
          <img key={i} src={src} alt={`logo-${i}`} />
        ))}
      </div>

      <div className="feature-row">
        {features.map((f, i) => (
          <div key={i} className="feature">
            <img src={f.icon} alt={f.text} />
            <div className="feature-text">
              <div className="feature-tt">{f.title}</div>
              <div className="feature-st">{f.text}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================
   BODY principal
========================= */
/**
 * Body: Componente principal que compone la estructura del contenido de la
 * página (vitrinas, categorías, recomendados, blog y marcas). Contiene datos
 * de ejemplo para poblar los componentes secundarios.
 */
export default function Body() {
  // ===== Data con imágenes de referencia (puedes cambiarlas por las tuyas) =====
  const shelf1 = {
    titleTabs: [
      "Batería auto y camioneta",
      "Batería camión y bus",
      "Acc. Baterías",
    ],
    sections: [
      {
        hero:
          "https://images.implementos.cl/uploads/catalogo/1742328292389.jpg",
        products: [
          {
            id: "b1",
            image:
              "https://images.implementos.cl/img/250/POWBAT0013-1.jpg",
            brand: "POWER TRUCK",
            name: "Batería 55ah 350cca 12V",
            price: 42990,
          },
          {
            id: "b2",
            image:
              "https://images.implementos.cl/img/250/ROCBAT1022-1.jpg",
            brand: "ROCKET",
            name: "Batería 90ah 770cca 12V",
            price: 108990,
          },
          {
            id: "b3",
            image:
              "https://images.implementos.cl/img/250/ACDBAT0041-1.jpg",
            brand: "AC DELCO",
            name: "Batería 80ah 700cca 12V",
            price: 102990,
          },
          {
            id: "b4",
            image:
              "https://images.implementos.cl/img/250/POWBAT0025-1.jpg",
            brand: "POWER TRUCK",
            name: "Batería 60ah 550cca 12V",
            price: 81990,
          },
        ],
        banner: {
          src:
            "https://placehold.co/1200x110/0a8d5e/ffffff?text=%C2%A1Tenemos+los+mismos+precios!&font=montserrat",
          cta: "www.implementos.cl",
        },
      },
      {
        hero:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
        products: new Array(4).fill(0).map((_, i) => ({
          id: `c${i}`,
          image:
            "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=600&auto=format&fit=crop",
          brand: "TRUCK PRO",
          name: "Batería heavy duty 12V",
          price: 99990,
        })),
      },
      {
        hero:
          "https://images.unsplash.com/photo-1607864963416-3ef1b3ae9d86?q=80&w=1200&auto=format&fit=crop",
        products: new Array(4).fill(0).map((_, i) => ({
          id: `a${i}`,
          image:
            "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600&auto=format&fit=crop",
          brand: "ACCESS",
          name: "Accesorio batería universal",
          price: 9990,
        })),
      },
    ],
  };

  const shelf2 = {
    titleTabs: ["Seguridad vial", "Cintas reflectantes"],
    sections: [
      {
        hero:
          "https://images.implementos.cl/uploads/catalogo/1742318266429.jpg",
        products: [
          {
            id: "s1",
            image:
              "https://images.implementos.cl/img/250/SEGCON0025-1.jpg",
            brand: "VORTEX",
            name: "Barrera premium roja",
            price: 49990,
          },
          {
            id: "s2",
            image:
              "https://images.implementos.cl/img/250/EPPVIA0002-1.jpg",
            brand: "BLACKSMITH",
            name: "Cono PVC doble cinta",
            price: 7990,
          },
          {
            id: "s3",
            image:
              "https://images.implementos.cl/img/250/ECOACC0010-1.jpg",
            brand: "BLACKSMITH",
            name: "Pértiga 12 pies con luz",
            price: 38990,
          },
          {
            id: "s4",
            image:
              "https://images.implementos.cl/img/250/ECOACC0006-1.jpg",
            brand: "BLACKSMITH",
            name: "Cuña poliuretano 20–30t",
            price: 12990,
          },
        ],
        banner: {
          src:
            "https://placehold.co/1200x110/dd1e2f/ffffff?text=Lleva+M%C3%A1s+Paga+Menos&font=montserrat",
          cta: "VER PRODUCTOS",
        },
      },
      {
        hero:
          "https://images.unsplash.com/photo-1514477917009-389c76a86b68?q=80&w=1200&auto=format&fit=crop",
        products: new Array(4).fill(0).map((_, i) => ({
          id: `cr${i}`,
          image:
            "https://images.unsplash.com/photo-1595261232928-7a5d9c4e7b2c?q=80&w=600&auto=format&fit=crop",
          brand: "RETRO",
          name: "Cinta reflectante grado ingeniería",
          price: 9990,
        })),
      },
    ],
  };

  const categories = [
    {
      image:
        "https://images.implementos.cl/uploads/catalogo/1670329649116.jpg",
      text: "Llantas y neumáticos",
      size: "l",
    },
    {
      image:
        "https://images.implementos.cl/uploads/catalogo/1670329649116.jpg",
      text: "Seguridad vial",
      size: "m",
    },
    {
      image:
        "https://images.implementos.cl/uploads/catalogo/1670010840075.jpg",
      text: "Control de carga",
      size: "m",
    },
    {
      image:
        "https://images.implementos.cl/uploads/catalogo/lubricantes.jpeg",
      text: "Lubricantes",
      size: "m",
    },
    {
      image:
        "https://images.implementos.cl/uploads/catalogo/1670329724754.jpg",
      text: "Refrigerantes",
      size: "m",
    },
    {
      image:
        "https://images.implementos.cl/uploads/catalogo/1670010807124.jpg",
      text: "Baterías",
      size: "m",
    },
  ];

  const recs = [
    {
      id: "r1",
      image:
        "https://images.implementos.cl/img/250/WUXACC0002-1.jpg",
      brand: "BLACKSMITH",
      name: "Guante algodon pigmentado",
      price: 690,
    },
    {
      id: "r2",
      image:
        "https://images.implementos.cl/img/250/SUNACC0020-1.jpg",
      brand: "AMCNITOS",
      name: "Cinturón seguridad 2 puntas",
      price: 6990,
    },
    {
      id: "r3",
      image:
        "https://images.implementos.cl/img/250/EPPMAN0026-1.jpg",
      brand: "BLACKSMITH",
      name: "Ratchet 2\" x 9 m",
      price: 8490,
    },
    {
      id: "r4",
      image:
        "https://images.implementos.cl/img/250/ATSREF0003-1.jpg",
      brand: "INDIANA",
      name: "Agua desmineralizada 10 lts",
      price: 3390,
    },
    {
      id: "r5",
      image:
        "https://images.implementos.cl/img/250/EPPMAN0014-1.jpg",
      brand: "STEELPRO",
      name: "Guante cabritilla forro talla 10",
      price: 1790,
    },
    {
      id: "r6",
      image:
        "https://images.implementos.cl/img/250/PROGUA0011-1.jpg",
      brand: "BLACKSMITH",
      name: "Eslinga 2\" x 5 m",
      price: 12990,
    },
  ];

  const blogPosts = [
    {
      title: "Inflatables para tu taller en Chile…",
      desc: "Herramientas clave para mecánicos y transportistas",
    },
    {
      title:
        "Herramientas inflables para el camión en Chile: guía práctica",
      desc: "Descubre cuáles te convienen",
    },
    {
      title:
        "Fallas en mangueras de aire: cómo identificarlas y elegir el recambio correcto…",
      desc: "Cuándo cambiarlas y cuál es la correcta",
      cta: "Mostrar más",
    },
    {
      title:
        "Fallas comunes en discos de freno: cómo detectarlas y cuándo cambiarlos",
    },
    {
      title:
        "Mes del camionero 2025: calendario y grandes sorteos en Implementos",
    },
  ];

  const logos = [
    "https://images.implementos.cl/marcas/randon.jpg",
    "https://images.implementos.cl/marcas/marcopolo.jpg",
    "https://images.implementos.cl/marcas/agrale.jpg",
    "https://images.implementos.cl/marcas/kinedyne2.png",
    "https://images.implementos.cl/marcas/sorl.jpg",
  ];

  const features = [
    {
      icon: "https://www.implementos.cl/assets/svg/11.svg",
      title: "Cambios y",
      text: "DEVOLUCIONES",
    },
    {
      icon: "https://www.implementos.cl/assets/svg/12.svg",
      title: "Nuestras",
      text: "TIENDAS",
    },
    {
      icon: "https://www.implementos.cl/assets/svg/13.svg",
      title: "Nuestros",
      text: "CATÁLOGOS",
    },
  ];

  return (
    <div className="body-wrap">
      {/* 1) Vitrinas tipo catálogo */}
      <TabbedShelf titleTabs={shelf1.titleTabs} sections={shelf1.sections} />
      <TabbedShelf titleTabs={shelf2.titleTabs} sections={shelf2.sections} />

      {/* 2) Grid categorías */}
      <CategoryGrid
        title="No te lo puedes perder"
        subtitle="Contamos con el mayor stock de productos a nivel nacional"
        items={categories}
      />

      {/* 3) Carrusel recomendados */}
      <RecsCarousel
        title="Otras personas han comprado esto"
        subtitle="no te pierdas estos imperdibles para tu ruta"
        products={recs}
      />

      {/* 4) Blog + marcas */}
      <BlogBlock
        image="https://images.implementos.cl/uploads/cms/images/1669230826292.jpg"
        posts={blogPosts}
      />
      <BrandsBlock logos={logos} features={features} />
    </div>
  );
}