package com.openhack.exception;

public class ErrorResponse {
	private int status;
	private String message;
	private long timeStamp;

	/**
	 *
	 * @param status
	 * @param message
	 * @param timeStamp
	 */
	public ErrorResponse(int status, String message, long timeStamp) {
		super();
		this.status = status;
		this.message = message;
		this.timeStamp = timeStamp;
	}

	/**
	 *
	 */
	public ErrorResponse() {
		super();
	}

	/**
	 *
	 * @return
	 */
	public int getStatus() {
		return status;
	}

	/**
	 *
	 * @param status
	 */
	public void setStatus(int status) {
		this.status = status;
	}

	/**
	 *
	 * @return
	 */
	public String getMessage() {
		return message;
	}

	/**
	 *
	 * @param message
	 */
	public void setMessage(String message) {
		this.message = message;
	}

	/**
	 *
	 * @return
	 */
	public long getTimeStamp() {
		return timeStamp;
	}

	/**
	 *
	 * @param timeStamp
	 */
	public void setTimeStamp(long timeStamp) {
		this.timeStamp = timeStamp;
	}

	/**
	 *
	 * @return
	 */
	@Override
	public String toString() {
		return "ErrorResponse [status=" + status + ", message=" + message + ", timeStamp=" + timeStamp + "]";
	}

}
