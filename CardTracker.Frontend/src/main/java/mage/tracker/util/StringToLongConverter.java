package mage.tracker.util;

import org.apache.commons.lang3.StringUtils;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * @author North
 * 
 */
@Component
public class StringToLongConverter implements Converter<String, Long> {

    @Override
    public Long convert(String source) {
        return StringUtils.isEmpty(source) || source.equalsIgnoreCase("_empty") ? null : Long.parseLong(source);
    }
}
