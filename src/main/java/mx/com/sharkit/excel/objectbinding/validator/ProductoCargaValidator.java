package mx.com.sharkit.excel.objectbinding.validator;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import mx.com.sharkit.excel.objectbinding.domain.ProductoCargaDTO;
import mx.com.sharkit.excel.objectbinding.domain.User;

@Component
public class ProductoCargaValidator extends LocalValidatorFactoryBean implements Validator {

	@Override
	public boolean supports(Class<?> clazz) {
		return User.class.equals(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		ProductoCargaDTO productoCarga = (ProductoCargaDTO) target;

		// Name is Required value
		if (!StringUtils.hasText(productoCarga.getNombre())) {
			errors.rejectValue("nombre", "producto.name.required", "El nombre es requerido");
			// to check multiple Errors for same field
			//errors.rejectValue("name", "user.name.required", "User Name is Required1");
		}

		// Precio is Required value
		if (productoCarga.getPrecio() == null) {
			errors.rejectValue("precio", "producto.precio.required", "El precio es requerido");
			// to check multiple Errors for same field
			//errors.rejectValue("name", "user.name.required", "User Name is Required1");
		}

	}

}
