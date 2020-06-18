package mx.com.sharkit.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import io.github.jhipster.config.cache.PrefixedKeyGenerator;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {
    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, mx.com.sharkit.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, mx.com.sharkit.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, mx.com.sharkit.domain.User.class.getName());
            createCache(cm, mx.com.sharkit.domain.Authority.class.getName());
            createCache(cm, mx.com.sharkit.domain.User.class.getName() + ".authorities");
            createCache(cm, mx.com.sharkit.domain.Producto.class.getName());
            createCache(cm, mx.com.sharkit.domain.Producto.class.getName() + ".ofertaProveedors");
            createCache(cm, mx.com.sharkit.domain.Producto.class.getName() + ".carritoCompras");
            createCache(cm, mx.com.sharkit.domain.Producto.class.getName() + ".carritoCompraDetalles");
            createCache(cm, mx.com.sharkit.domain.Producto.class.getName() + ".pedidoDetalles");
            createCache(cm, mx.com.sharkit.domain.Producto.class.getName() + ".inventarios");
            createCache(cm, mx.com.sharkit.domain.Producto.class.getName() + ".productoImagens");
            createCache(cm, mx.com.sharkit.domain.UnidadMedida.class.getName());
            createCache(cm, mx.com.sharkit.domain.UnidadMedida.class.getName() + ".productos");
            createCache(cm, mx.com.sharkit.domain.TipoArticulo.class.getName());
            createCache(cm, mx.com.sharkit.domain.TipoArticulo.class.getName() + ".productos");
            createCache(cm, mx.com.sharkit.domain.Categoria.class.getName());
            createCache(cm, mx.com.sharkit.domain.Categoria.class.getName() + ".productos");
            createCache(cm, mx.com.sharkit.domain.Seccion.class.getName());
            createCache(cm, mx.com.sharkit.domain.Seccion.class.getName() + ".productos");
            createCache(cm, mx.com.sharkit.domain.Estatus.class.getName());
            createCache(cm, mx.com.sharkit.domain.Estatus.class.getName() + ".productos");
            createCache(cm, mx.com.sharkit.domain.Estatus.class.getName() + ".ofertaProveedors");
            createCache(cm, mx.com.sharkit.domain.Estatus.class.getName() + ".clientes");
            createCache(cm, mx.com.sharkit.domain.Estatus.class.getName() + ".pedidos");
            createCache(cm, mx.com.sharkit.domain.Estatus.class.getName() + ".pedidoDetalles");
            createCache(cm, mx.com.sharkit.domain.Adjunto.class.getName());
            createCache(cm, mx.com.sharkit.domain.Adjunto.class.getName() + ".chats");
            createCache(cm, mx.com.sharkit.domain.Adjunto.class.getName() + ".productoImagens");
            createCache(cm, mx.com.sharkit.domain.Adjunto.class.getName() + ".usuarioImagens");
            createCache(cm, mx.com.sharkit.domain.Adjunto.class.getName() + ".parametrosAplicacions");
            createCache(cm, mx.com.sharkit.domain.Proveedor.class.getName());
            createCache(cm, mx.com.sharkit.domain.Proveedor.class.getName() + ".productos");
            createCache(cm, mx.com.sharkit.domain.Proveedor.class.getName() + ".ofertaProveedors");
            createCache(cm, mx.com.sharkit.domain.Proveedor.class.getName() + ".inventarios");
            createCache(cm, mx.com.sharkit.domain.OfertaProveedor.class.getName());
            createCache(cm, mx.com.sharkit.domain.TipoOferta.class.getName());
            createCache(cm, mx.com.sharkit.domain.TipoOferta.class.getName() + ".ofertaProveedors");
            createCache(cm, mx.com.sharkit.domain.Cliente.class.getName());
            createCache(cm, mx.com.sharkit.domain.Cliente.class.getName() + ".tarjetas");
            createCache(cm, mx.com.sharkit.domain.Cliente.class.getName() + ".direccions");
            createCache(cm, mx.com.sharkit.domain.Cliente.class.getName() + ".carritoCompras");
            createCache(cm, mx.com.sharkit.domain.Cliente.class.getName() + ".carritoHistoricos");
            createCache(cm, mx.com.sharkit.domain.Cliente.class.getName() + ".pedidos");
            createCache(cm, mx.com.sharkit.domain.Tarjeta.class.getName());
            createCache(cm, mx.com.sharkit.domain.Direccion.class.getName());
            createCache(cm, mx.com.sharkit.domain.CarritoCompra.class.getName());
            createCache(cm, mx.com.sharkit.domain.CarritoHistorico.class.getName());
            createCache(cm, mx.com.sharkit.domain.CarritoHistorico.class.getName() + ".carritoHistoricoDetalles");
            createCache(cm, mx.com.sharkit.domain.CarritoHistoricoDetalle.class.getName());
            createCache(cm, mx.com.sharkit.domain.Pedido.class.getName());
            createCache(cm, mx.com.sharkit.domain.Pedido.class.getName() + ".pedidoDetalles");
            createCache(cm, mx.com.sharkit.domain.Pedido.class.getName() + ".historicoPedidos");
            createCache(cm, mx.com.sharkit.domain.PedidoDetalle.class.getName());
            createCache(cm, mx.com.sharkit.domain.HistoricoPedido.class.getName());
            createCache(cm, mx.com.sharkit.domain.Transportista.class.getName());
            createCache(cm, mx.com.sharkit.domain.Transportista.class.getName() + ".pedidos");
            createCache(cm, mx.com.sharkit.domain.Transportista.class.getName() + ".transportistaTarifas");
            createCache(cm, mx.com.sharkit.domain.TransportistaTarifa.class.getName());
            createCache(cm, mx.com.sharkit.domain.Recolector.class.getName());
            createCache(cm, mx.com.sharkit.domain.Recolector.class.getName() + ".pedidos");
            createCache(cm, mx.com.sharkit.domain.Recolector.class.getName() + ".recolectorTarifas");
            createCache(cm, mx.com.sharkit.domain.RecolectorTarifa.class.getName());
            createCache(cm, mx.com.sharkit.domain.Chat.class.getName());
            createCache(cm, mx.com.sharkit.domain.Inventario.class.getName());
            createCache(cm, mx.com.sharkit.domain.Inventario.class.getName() + ".inventarioHistoricos");
            createCache(cm, mx.com.sharkit.domain.InventarioHistorico.class.getName());
            createCache(cm, mx.com.sharkit.domain.Notificacion.class.getName());
            createCache(cm, mx.com.sharkit.domain.Pagos.class.getName());
            createCache(cm, mx.com.sharkit.domain.Queja.class.getName());
            createCache(cm, mx.com.sharkit.domain.ProductoImagen.class.getName());
            createCache(cm, mx.com.sharkit.domain.UsuarioImagen.class.getName());
            createCache(cm, mx.com.sharkit.domain.ParametrosAplicacion.class.getName());
            createCache(cm, mx.com.sharkit.domain.Empresa.class.getName());
            createCache(cm, mx.com.sharkit.domain.Empresa.class.getName() + ".clientes");
            createCache(cm, mx.com.sharkit.domain.Empresa.class.getName() + ".proveedors");
            createCache(cm, mx.com.sharkit.domain.Empresa.class.getName() + ".recolectors");
            createCache(cm, mx.com.sharkit.domain.Empresa.class.getName() + ".transportistas");
            createCache(cm, mx.com.sharkit.domain.Empresa.class.getName() + ".productos");
            createCache(cm, mx.com.sharkit.domain.Empresa.class.getName() + ".categorias");
            createCache(cm, mx.com.sharkit.domain.Empresa.class.getName() + ".seccions");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
