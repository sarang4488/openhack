package com.openhack.exception;

public class XMLConversionException extends RuntimeException {
    /**
     *
     */
    public XMLConversionException() {
    }

    /**
     *
     * @param message
     */
    public XMLConversionException(String message) {
        super(message);
    }

    /**
     *
     * @param message
     * @param cause
     */
    public XMLConversionException(String message, Throwable cause) {
        super(message, cause);
    }

    /**
     *
     * @param cause
     */
    public XMLConversionException(Throwable cause) {
        super(cause);
    }

    /**
     *
     * @param message
     * @param cause
     * @param enableSuppression
     * @param writableStackTrace
     */
    public XMLConversionException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
