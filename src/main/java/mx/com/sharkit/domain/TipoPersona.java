package mx.com.sharkit.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * A TipoPersona.
 */
@Entity
@Table(name = "tipo_persona")
public class TipoPersona implements Serializable {

    private static final long serialVersionUID = 1L;
    
    public static final Long FISICA = 1L;
    public static final Long MORAL = 2L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 45)
    @Column(name = "nombre", length = 45, nullable = false)
    private String nombre;

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoPersona)) {
            return false;
        }
        return id != null && id.equals(((TipoPersona) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

	@Override
	public String toString() {
		return "TipoPersona [id=" + id + ", nombre=" + nombre + "]";
	}

}
